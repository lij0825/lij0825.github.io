import { useState, useEffect, useRef } from "react";
import { projectData, skillsData, timelineData } from "./data";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	type ChartOptions,
	type ChartData,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type ProjectId = keyof typeof projectData;

// 카운팅 애니메이션 훅
function useCountUp(target: number, duration = 1500, isVisible: boolean = false) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!isVisible) return;
		let startTime: number | null = null;
		const startValue = 0;

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			setCount(Math.floor(startValue + (target - startValue) * eased));
			if (progress < 1) requestAnimationFrame(animate);
		};
		requestAnimationFrame(animate);
	}, [target, duration, isVisible]);

	return count;
}

// 교차 관찰자 훅
function useIntersectionObserver(threshold = 0.3) {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setIsVisible(true);
			},
			{ threshold }
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [threshold]);

	return { ref, isVisible };
}

// 개별 성과 카드 컴포넌트
interface AchievementCardProps {
	value: number;
	suffix: string;
	prefix?: string;
	label: string;
	color: string;
	icon: string;
	isVisible: boolean;
}

function AchievementCard({ value, suffix, prefix = "", label, color, icon, isVisible }: AchievementCardProps) {
	const count = useCountUp(value, 1500, isVisible);

	return (
		<div className={`achievement-card bg-white dark:bg-gray-800 p-5 md:p-6 rounded-2xl shadow-md border-t-4 ${color} text-center`}>
			<div className="text-3xl mb-2">{icon}</div>
			<p className={`text-3xl md:text-4xl font-extrabold achievement-value ${color.replace("border-", "text-")}`}>
				{prefix}{count}{suffix}
			</p>
			<p className="text-sm md:text-base text-slate-500 dark:text-gray-300 mt-2 leading-snug">{label}</p>
		</div>
	);
}

function App() {
	const [activeTab, setActiveTab] = useState<ProjectId>("toudeuk");
	const [showAllProjects, setShowAllProjects] = useState(false);
	const [darkMode, setDarkMode] = useState(() => {
		const saved = localStorage.getItem("darkMode");
		return saved ? JSON.parse(saved) : true;
	});

	const { ref: statsRef, isVisible: statsVisible } = useIntersectionObserver(0.2);

	// 다크 모드 토글
	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
	}, [darkMode]);

	// 인쇄 시 자동으로 전체 프로젝트 보기
	useEffect(() => {
		const handleBeforePrint = () => {
			setShowAllProjects(true);
		};
		window.addEventListener("beforeprint", handleBeforePrint);
		return () => {
			window.removeEventListener("beforeprint", handleBeforePrint);
		};
	}, []);

	const renderProjectContent = () => {
		const data = projectData[activeTab];
		if (!data) return null;

		return (
			<div className="overflow-hidden">
				<h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white break-words">
					{data.title}
				</h3>
				<p className="text-base md:text-lg text-slate-500 dark:text-gray-400 mt-2 mb-6 break-words">
					{data.summary}
				</p>
				<div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 mb-6 text-sm md:text-base">
					{data.meta.map((item: { icon: string; text: string }, index: number) => (
						<div key={index} className="flex items-center text-slate-500 dark:text-gray-400">
							<i className={`fas ${item.icon} mr-2`}></i>
							<span className="break-words">{item.text}</span>
						</div>
					))}
				</div>
				<div className="flex flex-wrap mb-8">
					{data.tech.map((t: string, index: number) => (
						<span
							key={index}
							className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs md:text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
						>
							{t}
						</span>
					))}
				</div>

				<div className="grid md:grid-cols-2 gap-6 md:gap-8">
					<div className="overflow-hidden">
						<h4 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white border-b dark:border-gray-600 pb-2 mb-4">
							문제 해결 과정 (Action)
						</h4>
						{data.actions.map((action: { title: string; detail: string }, index: number) => (
							<div key={index} className="mb-5 p-4 rounded-lg bg-slate-50 dark:bg-gray-700/50 border-l-4 border-blue-400 dark:border-blue-500">
								<h5 className="font-semibold text-sm md:text-base text-slate-700 dark:text-gray-200 mb-2 break-words">
									{action.title}
								</h5>
								<p className="text-xs md:text-sm text-slate-600 dark:text-gray-400 whitespace-pre-line break-words leading-relaxed">
									{action.detail}
								</p>
							</div>
						))}
					</div>
					<div className="overflow-hidden">
						<h4 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white border-b dark:border-gray-600 pb-2 mb-4">
							핵심 성과 (Result)
						</h4>
						{data.results.map(
							(
								result: {
									title: string;
									detail: string;
									chart?: {
										type: "bar";
										data: ChartData<"bar">;
										options: ChartOptions<"bar">;
									};
								},
								index: number
							) => (
								<div
									key={index}
									className="mb-6 p-4 md:p-6 rounded-lg bg-slate-50 dark:bg-gray-700 overflow-hidden"
								>
									<h5 className="font-bold text-base md:text-lg text-slate-800 dark:text-white break-words">
										{result.title}
									</h5>
									<p className="text-xs md:text-sm text-slate-600 dark:text-gray-300 mt-2 mb-4 break-words">
										{result.detail}
									</p>
									{"chart" in result && result.chart && (
										<div className="chart-container w-full overflow-hidden">
											<Bar
												data={result.chart.data}
												options={result.chart.options as ChartOptions<"bar">}
											/>
										</div>
									)}
								</div>
							)
						)}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
			{/* 다크 모드 토글 버튼 - 고정 */}
			<div className="fixed top-4 right-4 z-50 print:hidden">
				<button
					onClick={() => setDarkMode(!darkMode)}
					className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-gray-600"
					aria-label="다크 모드 토글"
				>
					{darkMode ? (
						<i className="fas fa-sun text-yellow-400 text-lg"></i>
					) : (
						<i className="fas fa-moon text-slate-600 text-lg"></i>
					)}
				</button>
			</div>

			{/* Hero 섹션 */}
			<section className="hero-section relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4 bg-slate-100 dark:bg-gray-900">
				{/* 배경 그라디언트 */}
				<div className="hero-bg absolute inset-0"></div>
				{/* 배경 장식 원 */}
				<div className="hero-orb hero-orb-1"></div>
				<div className="hero-orb hero-orb-2"></div>
				<div className="hero-orb hero-orb-3"></div>

				<div className="relative z-10 fade-in-up">
					{/* 프로필 이미지 */}
					<div className="flex justify-center mb-8">
						<img
							src="/profile.png"
							alt="이인준 프로필"
							className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover shadow-xl border-4 border-white/20"
						/>
					</div>

					<p className="text-blue-400 dark:text-blue-300 font-semibold text-sm md:text-base tracking-widest uppercase mb-3 hero-badge">
						Backend Developer
					</p>
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 hero-title">
						이인준
					</h1>
					{/* 직업명 */}
					<div className="h-10 md:h-12 flex items-center justify-center mb-6">
						<span className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium">
							Backend Engineer
						</span>
					</div>

					{/* Summary 한 줄 */}
					<p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed mb-8 px-4">
						Redis를 활용한 동시성 제어, 검색 최적화 등으로 서비스 성능을 <span className="text-blue-400 font-semibold">90% 이상 개선</span>하며
						성능 병목을 해결하는 경험을 쌓았습니다.
						테스트 자동화와 CI/CD 파이프라인 구축을 통해 안정적인 개발 문화를 만드는 데 기여했습니다.
					</p>

					{/* 연락처 버튼 */}
					<div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
						<a
							href="mailto:dldlswms890@gmail.com"
							className="hero-btn hero-btn-primary"
						>
							<i className="fas fa-envelope mr-2"></i>dldlswms890@gmail.com
						</a>
						<a
							href="https://github.com/lij0825"
							target="_blank"
							rel="noopener noreferrer"
							className="hero-btn hero-btn-secondary"
						>
							<i className="fab fa-github mr-2"></i>github.com/lij0825
						</a>
						<span className="hero-btn hero-btn-secondary">
							<i className="fas fa-phone mr-2"></i>010-4655-3514
						</span>
					</div>

				</div>
			</section>

			<div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl py-8 md:py-12">

				{/* Summary 섹션 */}
				<section
					id="summary"
					className="mb-10 md:mb-16 bg-white dark:bg-gray-800 p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700"
				>
					<h2 className="section-title">
						<span className="section-title-accent">SUMMARY</span>
					</h2>
					<p className="text-sm md:text-base text-center text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-loose">
						백엔드 개발자 이인준입니다.{" "}
						<strong className="text-blue-600 dark:text-blue-400">Redis를 활용한 동시성 제어</strong>,{" "}
						<strong className="text-blue-600 dark:text-blue-400">검색 최적화</strong> 등으로 서비스 성능을{" "}
						<strong className="text-green-600 dark:text-green-400">90% 이상 개선</strong>하며
						성능 병목을 해결하는 경험을 쌓았습니다.
						<br />
						또한 <strong className="text-blue-600 dark:text-blue-400">테스트 자동화</strong>와{" "}
						<strong className="text-blue-600 dark:text-blue-400">CI/CD 파이프라인 구축</strong>을 통해
						안정적인 개발 문화를 만드는 데 기여했습니다.
						<br />
						앞으로도 기술을 통해 실제 비즈니스 문제를 해결하며 성장하는 개발자가 되고 싶습니다.
					</p>

					{/* 키워드 뱃지 */}
					<div className="flex flex-wrap justify-center gap-2 mt-6">
						{["동시성 제어", "성능 최적화", "Redis", "Kafka", "CI/CD", "테스트 자동화", "분산 시스템", "Spring Boot"].map((kw) => (
							<span key={kw} className="keyword-badge">
								{kw}
							</span>
						))}
					</div>
				</section>

				{/* 구분선 */}
				<div className="section-divider"></div>

				{/* 핵심 성과 지표 */}
				<section id="key-achievements" className="mb-10 md:mb-16" ref={statsRef}>
					<h2 className="section-title">
						<span className="section-title-accent">핵심 성과 지표</span>
					</h2>
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-center">
						<AchievementCard
							value={685}
							suffix="%"
							label="동시성 처리량(TPS) 향상 (70 → 550)"
							color="border-blue-500"
							icon="⚡"
							isVisible={statsVisible}
						/>
						<AchievementCard
							value={99}
							suffix=".4%"
							prefix="-"
							label="검색 응답 시간 단축 (4700ms → 25ms)"
							color="border-green-500"
							icon="🔍"
							isVisible={statsVisible}
						/>
						<AchievementCard
							value={93}
							suffix="%"
							prefix="-"
							label="위치 기반 검색 속도 개선 (4.5초 → 300ms)"
							color="border-indigo-500"
							icon="📍"
							isVisible={statsVisible}
						/>
						<AchievementCard
							value={141}
							suffix="개"
							label="단위 테스트 케이스 작성 (디버깅 시간 50% 단축)"
							color="border-purple-500"
							icon="🧪"
							isVisible={statsVisible}
						/>
					</div>
				</section>

				{/* 구분선 */}
				<div className="section-divider"></div>

				{/* 프로젝트 섹션 */}
				<section id="projects" className="mb-10 md:mb-16">
					<h2 className="section-title">
						<span className="section-title-accent">PROJECTS</span>
					</h2>
					<div className="text-center text-slate-600 dark:text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto text-sm md:text-base">
						<p>
							다양한 비즈니스 문제를 기술적으로 해결한 프로젝트 경험입니다.
							<br />각 프로젝트는 문제 정의, 해결 과정, 그리고 정량적인 성과 중심으로 구성되어
							있습니다.
							<br />
							탭을 클릭하여 각 프로젝트의 상세 내용을 확인하실 수 있습니다.
						</p>
					</div>

					{/* 탭 */}
					<div className="flex flex-wrap justify-center mb-4 border-b dark:border-gray-700 print:hidden gap-2 md:gap-0">
						{(Object.keys(projectData) as ProjectId[]).map((tabId) => {
							const titles: Record<ProjectId, string> = {
								toudeuk: "터득(TOUDEUK)",
								library: "나의 작은 도서관",
								ssapick: "SSAPICK",
							};
							return (
								<button
									key={String(tabId)}
									onClick={() => {
										setActiveTab(tabId);
										setShowAllProjects(false);
									}}
									className={`tab-btn px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm lg:text-lg font-semibold border-b-2 whitespace-nowrap ${
										activeTab === tabId && !showAllProjects
											? "tab-active"
											: "border-transparent text-slate-500 dark:text-gray-400"
									}`}
								>
									{titles[tabId]}
								</button>
							);
						})}
					</div>

					{/* 전체 보기 버튼 */}
					<div className="flex justify-center mb-8">
						<button
							onClick={() => setShowAllProjects(!showAllProjects)}
							className="print:hidden group relative px-4 py-2 md:px-6 md:py-2.5 text-sm md:text-base rounded-lg font-medium transition-all duration-300 flex items-center gap-2 border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white hover:shadow-lg"
						>
							<i
								className={`fas fa-${
									showAllProjects ? "chevron-up" : "chevron-down"
								} transition-transform group-hover:scale-110`}
							></i>
							<span>{showAllProjects ? "접기" : "전체 프로젝트 보기"}</span>
						</button>
					</div>

					{/* 프로젝트 내용 */}
					{showAllProjects ? (
						<div className="space-y-8">
							{(Object.keys(projectData) as ProjectId[]).map((projectId) => {
								const data = projectData[projectId];
								return (
									<div
										key={projectId}
										className="bg-white dark:bg-gray-800 p-4 md:p-6 lg:p-8 rounded-2xl shadow-sm page-break-inside-avoid border border-slate-100 dark:border-gray-700"
									>
										<h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
											{data.title}
										</h3>
										<p className="text-base md:text-lg text-slate-500 dark:text-gray-400 mt-2 mb-6">
											{data.summary}
										</p>
										<div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 mb-6 text-sm md:text-base">
											{data.meta.map((item: { icon: string; text: string }, index: number) => (
												<div
													key={index}
													className="flex items-center text-slate-500 dark:text-gray-400"
												>
													<i className={`fas ${item.icon} mr-2`}></i>
													<span>{item.text}</span>
												</div>
											))}
										</div>
										<div className="flex flex-wrap mb-8">
											{data.tech.map((t: string, index: number) => (
												<span
													key={index}
													className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs md:text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
												>
													{t}
												</span>
											))}
										</div>

										<div className="grid md:grid-cols-2 gap-6 md:gap-8">
											<div className="overflow-hidden">
												<h4 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white border-b dark:border-gray-600 pb-2 mb-4">
													문제 해결 과정 (Action)
												</h4>
												{data.actions.map(
													(action: { title: string; detail: string }, index: number) => (
														<div key={index} className="mb-5 p-4 rounded-lg bg-slate-50 dark:bg-gray-700/50 border-l-4 border-blue-400 dark:border-blue-500">
															<h5 className="font-semibold text-sm md:text-base text-slate-700 dark:text-gray-200 mb-2 break-words">
																{action.title}
															</h5>
															<p className="text-xs md:text-sm text-slate-600 dark:text-gray-400 whitespace-pre-line break-words leading-relaxed">
																{action.detail}
															</p>
														</div>
													)
												)}
											</div>
											<div className="overflow-hidden">
												<h4 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white border-b dark:border-gray-600 pb-2 mb-4">
													핵심 성과 (Result)
												</h4>
												{data.results.map(
													(
														result: {
															title: string;
															detail: string;
															chart?: {
																type: "bar";
																data: ChartData<"bar">;
																options: ChartOptions<"bar">;
															};
														},
														index: number
													) => (
														<div
															key={index}
															className="mb-6 p-4 md:p-6 rounded-lg bg-slate-50 dark:bg-gray-700 overflow-hidden"
														>
															<h5 className="font-bold text-base md:text-lg text-slate-800 dark:text-white break-words">
																{result.title}
															</h5>
															<p className="text-xs md:text-sm text-slate-600 dark:text-gray-300 mt-2 mb-4 break-words">
																{result.detail}
															</p>
															{"chart" in result && result.chart && (
																<div className="chart-container w-full overflow-hidden">
																	<Bar
																		data={result.chart.data}
																		options={result.chart.options as ChartOptions<"bar">}
																	/>
																</div>
															)}
														</div>
													)
												)}
											</div>
										</div>
									</div>
								);
							})}

							{/* 하단 접기 버튼 */}
							<div className="flex justify-center mt-8">
								<button
									onClick={() => {
										const currentScroll = window.scrollY;
										setShowAllProjects(false);
										requestAnimationFrame(() => {
											window.scrollTo(0, currentScroll);
										});
									}}
									className="print:hidden group relative px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white hover:shadow-lg"
								>
									<i className="fas fa-chevron-up transition-transform group-hover:scale-110"></i>
									<span>접기</span>
								</button>
							</div>
						</div>
					) : (
						<div
							id="project-content"
							className="bg-white dark:bg-gray-800 p-4 md:p-6 lg:p-8 rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-gray-700"
						>
							{renderProjectContent()}
						</div>
					)}
				</section>

				{/* 구분선 */}
				<div className="section-divider"></div>

				{/* 스킬 섹션 */}
				<section id="skills" className="mb-10 md:mb-16">
					<h2 className="section-title">
						<span className="section-title-accent">SKILLS</span>
					</h2>
					<div
						id="skills-content"
						className="bg-white dark:bg-gray-800 p-4 md:p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6 md:gap-y-8 lg:gap-y-12">
							{Object.entries(skillsData).map(
								([category, skills]: [
									string,
									Array<{ name: string; icon: string; level: number; description: string }>
								]) => (
									<div key={category}>
										<h4 className="font-bold text-slate-700 dark:text-gray-200 mb-3 md:mb-4 text-sm md:text-base flex items-center gap-2">
											<span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
											{category}
										</h4>
										<div className="flex flex-wrap gap-2 md:gap-3">
											{skills.map(
												(
													skill: { name: string; icon: string; level: number; description: string },
													index: number
												) => (
													<span
														key={index}
														className="bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 text-xs md:text-sm font-medium px-2.5 py-1 md:px-3 md:py-1.5 rounded-full transition-colors hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-800 dark:hover:text-blue-200 flex items-center gap-1.5 md:gap-2 cursor-default"
													>
														{skill.icon.startsWith("iconify:") ? (
															<span
																className="iconify w-3.5 h-3.5 md:w-4 md:h-4"
																data-icon={skill.icon.replace("iconify:", "")}
															></span>
														) : (
															<i className={skill.icon}></i>
														)}
														{skill.name}
													</span>
												)
											)}
										</div>
									</div>
								)
							)}
						</div>
					</div>
				</section>

				{/* 구분선 */}
				<div className="section-divider"></div>

				{/* 타임라인 섹션 */}
				<section id="timeline" className="mb-10 md:mb-16">
					<h2 className="section-title">
						<span className="section-title-accent">EDUCATION & ACTIVITIES</span>
					</h2>
					<div className="relative pl-12 md:pl-16 lg:pl-20">
						<div className="absolute left-6 md:left-8 lg:left-12 h-full border-l-2 border-slate-200 dark:border-gray-600"></div>
						<div id="timeline-content">
							{timelineData.map(
								(item: { period: string; title: string; description?: string }, index: number) => (
									<div key={index} className="relative pb-6 md:pb-8 timeline-item">
										<p className="text-xs md:text-sm text-slate-500 dark:text-gray-400">
											{item.period}
										</p>
										<h4 className="font-bold text-sm md:text-base text-slate-800 dark:text-white mt-1">
											{item.title}
										</h4>
										{item.description && (
											<p className="text-xs md:text-sm text-slate-600 dark:text-gray-300">
												{item.description}
											</p>
										)}
									</div>
								)
							)}
						</div>
					</div>
				</section>

				<footer className="text-center text-slate-400 dark:text-gray-600 pt-8 border-t border-slate-200 dark:border-gray-700 pb-8">
					<p className="text-sm">© 2024 이인준. Built with React + TypeScript.</p>
				</footer>
			</div>
		</div>
	);
}

export default App;
