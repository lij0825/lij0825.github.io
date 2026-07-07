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

// 교차 관찰자 훅 (fade-in 애니메이션용)
function useIntersectionObserver(threshold = 0.15) {
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

// 프로젝트 카드 컴포넌트
interface ProjectCardProps {
	projectId: ProjectId;
}

function ProjectCard({ projectId }: ProjectCardProps) {
	const { ref, isVisible } = useIntersectionObserver();
	const data = projectData[projectId];

	return (
		<div
			ref={ref}
			className={`bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
				}`}
		>
			{/* 프로젝트 헤더 */}
			<div className="mb-6">
				<h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
					{data.title}
				</h3>
				<p className="text-base text-slate-500 dark:text-gray-400 mt-2 mb-4">
					{data.summary}
				</p>
				<div className="flex flex-col sm:flex-row sm:items-start gap-2 text-sm text-slate-500 dark:text-gray-400 mb-4">
					<span className="flex items-center gap-1.5 shrink-0">
						<i className="fas fa-calendar-alt text-blue-400"></i>
						{data.period}
					</span>
					<span className="hidden sm:block text-slate-300 dark:text-gray-600">|</span>
					<span className="flex items-start gap-1.5">
						<i className="fas fa-user-friends text-blue-400 mt-0.5 shrink-0"></i>
						<span>{data.role}</span>
					</span>
				</div>
				{/* 기술 스택 */}
				<div className="flex flex-wrap gap-1.5">
					{data.tech.map((t: string, index: number) => (
						<span
							key={index}
							className="bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-blue-100 dark:border-blue-800"
						>
							{t}
						</span>
					))}
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-6 md:gap-8">
				{/* 문제 해결 과정 */}
				<div>
					<h4 className="text-base md:text-lg font-bold text-slate-800 dark:text-white border-b dark:border-gray-600 pb-2 mb-4">
						문제 해결 과정
					</h4>
					<div className="space-y-4">
						{data.actions.map(
							(
								action: { title: string; problem: string; solution: string; result: string },
								index: number
							) => (
								<div
									key={index}
									className="p-4 rounded-xl bg-slate-50 dark:bg-gray-700/50 border-l-4 border-blue-400 dark:border-blue-500"
								>
									<h5 className="font-semibold text-sm text-slate-700 dark:text-gray-200 mb-3">
										{action.title}
									</h5>
									<div className="space-y-1.5 text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
										<p>
											<span className="font-semibold text-red-500 dark:text-red-400 mr-1">문제</span>
											{action.problem}
										</p>
										<p>
											<span className="font-semibold text-blue-500 dark:text-blue-400 mr-1">해결</span>
											{action.solution}
										</p>
										<p>
											<span className="font-semibold text-green-500 dark:text-green-400 mr-1">결과</span>
											{action.result}
										</p>
									</div>
								</div>
							)
						)}
					</div>
				</div>

				{/* 핵심 성과 */}
				<div>
					<h4 className="text-base md:text-lg font-bold text-slate-800 dark:text-white border-b dark:border-gray-600 pb-2 mb-4">
						핵심 성과
					</h4>
					<div className="space-y-4">
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
									className="p-4 md:p-5 rounded-xl bg-slate-50 dark:bg-gray-700"
								>
									<h5 className="font-bold text-sm md:text-base text-slate-800 dark:text-white">
										{result.title}
									</h5>
									<p className="text-xs text-slate-500 dark:text-gray-400 mt-1.5 mb-3 leading-relaxed">
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
		</div>
	);
}

function App() {
	const [darkMode, setDarkMode] = useState(() => {
		const saved = localStorage.getItem("darkMode");
		return saved ? JSON.parse(saved) : true;
	});

	// 다크 모드 토글
	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
	}, [darkMode]);

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

			{/* ── Hero 섹션 ── */}
			<section className="hero-section relative min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden px-4 bg-slate-50 dark:bg-gray-900">
				<div className="hero-bg absolute inset-0"></div>
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

					<p className="text-blue-500 dark:text-blue-300 font-semibold text-sm md:text-base tracking-widest uppercase mb-4 hero-badge">
						Backend Developer
					</p>
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-10 hero-title">
						이인준
					</h1>

					{/* 연락처 버튼 */}
					<div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
						<a href="mailto:dldlswms890@gmail.com" className="hero-btn hero-btn-primary">
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

				<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-slate-50 dark:to-gray-900 pointer-events-none z-10"></div>
			</section>

			<div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl py-8 md:py-12">

				{/* ── Summary 섹션 ── */}
				<section
					id="summary"
					className="mb-10 md:mb-16 bg-white dark:bg-gray-800 p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700"
				>
					<h2 className="section-title">
						<span className="section-title-accent">SUMMARY</span>
					</h2>
					<p className="text-sm md:text-base text-center text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-loose">
						성능 병목을 측정하고, 직접 코드로 개선하는 백엔드 개발자 이인준입니다.
						<br />
						<strong className="text-blue-600 dark:text-blue-400">SSAFY 11기 Java 트랙</strong>을 수료하며
						3번의 팀 프로젝트에서 실제 서비스 문제를 직접 해결했습니다.
						<br />
						<strong className="text-slate-700 dark:text-slate-300">터득</strong> 프로젝트에서{" "}
						<strong className="text-blue-600 dark:text-blue-400">Redis INCR 원자 연산과 Kafka 비동기 처리</strong>를
						단계적으로 적용해{" "}
						<strong className="text-green-600 dark:text-green-400">TPS 70 → 550</strong>을 달성했고,
						<br />
						Full-Text Search 전환으로{" "}
						<strong className="text-green-600 dark:text-green-400">검색 응답 시간을 4700ms → 25ms</strong>로 줄였습니다.
						<br />
						<strong className="text-slate-700 dark:text-slate-300">SSAPICK</strong> 프로젝트에서는 레이어별{" "}
						<strong className="text-blue-600 dark:text-blue-400">단위 테스트 141개</strong>를 작성하고,
						<br />
						테스트 실패 시 빌드가 자동 중단되도록 Jenkins CI 파이프라인에 통합해
						비정상 코드 배포를 원천 차단했습니다.
						<br />
						함께 일하고 싶은 개발자가 되겠습니다.
					</p>
					<div className="flex flex-wrap justify-center gap-2 mt-6">
						{["SSAFY 11기", "동시성 제어", "성능 최적화", "Redis", "Kafka", "CI/CD", "테스트 자동화", "Spring Boot"].map((kw) => (
							<span key={kw} className="keyword-badge">
								{kw}
							</span>
						))}
					</div>
				</section>

				<div className="section-divider"></div>

				{/* ── Projects 섹션 (순차 표시) ── */}
				<section id="projects" className="mb-10 md:mb-16">
					<h2 className="section-title">
						<span className="section-title-accent">PROJECTS</span>
					</h2>
					<p className="text-center text-slate-500 dark:text-gray-400 mb-8 text-sm md:text-base">
						비즈니스 문제를 기술로 해결한 프로젝트 경험입니다. 각 항목은 문제 → 해결 → 결과 구조로 구성되어 있습니다.
					</p>
					<div className="space-y-8">
						{(Object.keys(projectData) as ProjectId[]).map((projectId) => (
							<ProjectCard key={projectId} projectId={projectId} />
						))}
					</div>
				</section>

				<div className="section-divider"></div>

				{/* ── Skills 섹션 (숙련도 표시) ── */}
				<section id="skills" className="mb-10 md:mb-16">
					<h2 className="section-title">
						<span className="section-title-accent">SKILLS</span>
					</h2>
					<div
						id="skills-content"
						className="bg-white dark:bg-gray-800 p-4 md:p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
							{Object.entries(skillsData).map(
								([category, skills]: [
									string,
									Array<{ name: string; icon: string; level: number; description: string }>
								]) => (
									<div key={category}>
										<h4 className="font-bold text-slate-700 dark:text-gray-200 mb-3 text-sm md:text-base flex items-center gap-2">
											<span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
											{category}
										</h4>
										<div className="flex flex-wrap gap-2">
											{skills.map(
												(
													skill: { name: string; icon: string; level: number; description: string },
													index: number
												) => (
													<span
														key={index}
														className="bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 text-xs md:text-sm font-medium px-3 py-1.5 rounded-full transition-colors hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-800 dark:hover:text-blue-200 flex items-center gap-1.5 cursor-default"
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
														<span className="flex items-center gap-0.5 ml-1">
															{[1, 2, 3].map((dot) => (
																<span
																	key={dot}
																	className={`w-1.5 h-1.5 rounded-full ${dot <= skill.level
																		? "bg-blue-500 dark:bg-blue-400"
																		: "bg-slate-300 dark:bg-slate-600"
																		}`}
																/>
															))}
														</span>
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

				<div className="section-divider"></div>

				{/* ── Education & Activities 섹션 ── */}
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

			</div>
		</div>
	);
}

export default App;
