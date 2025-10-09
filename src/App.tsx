import { useState, useEffect } from "react";
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

function App() {
  const [activeTab, setActiveTab] = useState<ProjectId>("toudeuk");
  const [showAllProjects, setShowAllProjects] = useState(false);

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
      <div>
        <h3 className="text-3xl font-bold text-slate-800">{data.title}</h3>
        <p className="text-lg text-slate-500 mt-2 mb-6">{data.summary}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
          {data.meta.map((item: { icon: string; text: string }, index: number) => (
            <div key={index} className="flex items-center text-slate-500">
              <i className={`fas ${item.icon} mr-2`}></i>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap mb-8">
          {data.tech.map((t: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">
              문제 해결 과정 (Action)
            </h4>
            {data.actions.map((action: { title: string; detail: string }, index: number) => (
              <div key={index} className="mb-4">
                <h5 className="font-semibold text-slate-700">{action.title}</h5>
                <p className="text-slate-600 whitespace-pre-line">{action.detail}</p>
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">
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
                <div key={index} className="mb-6 p-6 rounded-lg bg-slate-50">
                  <h5 className="font-bold text-lg text-slate-800">{result.title}</h5>
                  <p className="text-slate-600 mt-2 mb-4">{result.detail}</p>
                  {"chart" in result && result.chart && (
                    <div className="chart-container">
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
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto p-4 md:p-8 max-w-6xl">
        <header className="text-center mb-12">
          {/* 프로필 이미지 */}
          <div className="flex justify-center mb-6">
            <img
              src="/profile.png"
              alt="이인준 프로필"
              className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-white bg-white"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">이인준</h1>
          <p className="text-xl md:text-2xl text-slate-600 mt-2">Backend Engineer</p>
          <div className="flex justify-center items-center space-x-6 mt-6 text-slate-500">
            <a
              href="mailto:dldlswns890@gmail.com"
              className="hover:text-blue-500 transition-colors"
            >
              <i className="fas fa-envelope mr-2"></i>dldlswns890@gmail.com
            </a>
            <a
              href="https://github.com/lij0825"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <i className="fab fa-github mr-2"></i>github.com/lij0825
            </a>
            <span>
              <i className="fas fa-phone mr-2"></i>010-4655-3514
            </span>
          </div>
        </header>

        <section id="summary" className="mb-12 bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">SUMMARY</h2>
          <p className="text-center text-slate-600 max-w-3xl mx-auto leading-relaxed">
            대규모 트래픽 처리 및 성능 최적화에 강점을 가진 백엔드 개발자입니다. <br />
            Redis를 활용한 동시성 제어와 캐싱 전략으로 서비스 응답 시간을 90% 이상 단축한 경험이
            있습니다. <br />
            테스트 코드 작성과 CI/CD 파이프라인 구축을 통해 안정적인 서비스를 만드는 과정을
            즐깁니다.
            <br />
            기술을 통해 비즈니스의 병목을 해결하고 성장에 기여하는 개발자가 되고 싶습니다.
          </p>
        </section>

        <section id="key-achievements" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">핵심 성과 지표</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-4xl font-bold text-blue-500">685%</p>
              <p className="text-slate-500 mt-2">동시성 처리량(TPS) 향상</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-4xl font-bold text-green-500">-99.4%</p>
              <p className="text-slate-500 mt-2">검색 응답 시간 단축</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-4xl font-bold text-indigo-500">-93%</p>
              <p className="text-slate-500 mt-2">위치 기반 검색 속도 개선</p>
            </div>
          </div>
        </section>

        <section id="projects" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">PROJECTS</h2>
          <div className="text-center text-slate-600 mb-6 max-w-3xl mx-auto">
            <p>
              다양한 비즈니스 문제를 기술적으로 해결한 프로젝트 경험입니다.
              <br />각 프로젝트는 문제 정의, 해결 과정, 그리고 정량적인 성과 중심으로 구성되어
              있습니다.
              <br />
              탭을 클릭하여 각 프로젝트의 상세 내용을 확인하실 수 있습니다.
            </p>
          </div>

          {/* 탭 */}
          <div className="flex justify-center mb-4 border-b print:hidden">
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
                  className={`tab-btn px-6 py-3 text-lg font-semibold border-b-2 ${
                    activeTab === tabId && !showAllProjects
                      ? "tab-active"
                      : "border-transparent text-slate-500"
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
              className="print:hidden group relative px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white hover:shadow-lg"
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
            // 전체 프로젝트 보기
            <div className="space-y-8">
              {(Object.keys(projectData) as ProjectId[]).map((projectId) => {
                const data = projectData[projectId];
                return (
                  <div
                    key={projectId}
                    className="bg-white p-6 md:p-8 rounded-xl shadow-sm page-break-inside-avoid"
                  >
                    <h3 className="text-3xl font-bold text-slate-800">{data.title}</h3>
                    <p className="text-lg text-slate-500 mt-2 mb-6">{data.summary}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                      {data.meta.map((item: { icon: string; text: string }, index: number) => (
                        <div key={index} className="flex items-center text-slate-500">
                          <i className={`fas ${item.icon} mr-2`}></i>
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap mb-8">
                      {data.tech.map((t: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">
                          문제 해결 과정 (Action)
                        </h4>
                        {data.actions.map(
                          (action: { title: string; detail: string }, index: number) => (
                            <div key={index} className="mb-4">
                              <h5 className="font-semibold text-slate-700">{action.title}</h5>
                              <p className="text-slate-600 whitespace-pre-line">{action.detail}</p>
                            </div>
                          )
                        )}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">
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
                            <div key={index} className="mb-6 p-6 rounded-lg bg-slate-50">
                              <h5 className="font-bold text-lg text-slate-800">{result.title}</h5>
                              <p className="text-slate-600 mt-2 mb-4">{result.detail}</p>
                              {"chart" in result && result.chart && (
                                <div className="chart-container">
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
                    // 현재 스크롤 위치 저장
                    const currentScroll = window.scrollY;

                    // 접기
                    setShowAllProjects(false);

                    // DOM 업데이트 후 스크롤 위치 복원
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
            // 탭으로 보기 (기존)
            <div id="project-content" className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
              {renderProjectContent()}
            </div>
          )}
        </section>

        <section id="skills" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">SKILLS</h2>
          <p className="text-center text-slate-500 text-sm mb-6">
            <i className="fas fa-info-circle mr-2"></i>
            스킬에 마우스를 올리면 상세 정보와 숙련도를 확인할 수 있습니다
          </p>
          <div id="skills-content" className="bg-white p-8 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {Object.entries(skillsData).map(
                ([category, skills]: [
                  string,
                  Array<{ name: string; icon: string; level: number; description: string }>
                ]) => (
                  <div key={category}>
                    <h4 className="font-bold text-slate-700 mb-4">{category}</h4>
                    <div className="flex flex-wrap gap-3">
                      {skills.map(
                        (
                          skill: { name: string; icon: string; level: number; description: string },
                          index: number
                        ) => (
                          <div key={index} className="relative group">
                            <span className="bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-full cursor-pointer transition-colors hover:bg-blue-100 hover:text-blue-800 flex items-center gap-2">
                              {skill.icon.startsWith("iconify:") ? (
                                <span
                                  className="iconify w-4 h-4"
                                  data-icon={skill.icon.replace("iconify:", "")}
                                ></span>
                              ) : (
                                <i className={skill.icon}></i>
                              )}
                              {skill.name}
                            </span>
                            {/* 툴팁 */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-white rounded-lg shadow-xl invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 z-10 border border-slate-200">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-bold text-slate-800">{skill.name}</h5>
                                <div className="flex space-x-1 text-sm">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <i
                                      key={star}
                                      className={`fa-star ${
                                        star <= skill.level
                                          ? "fas text-amber-400"
                                          : "far text-gray-300"
                                      }`}
                                    ></i>
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                {skill.description}
                              </p>
                              {/* 툴팁 화살표 */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                                <div className="border-8 border-transparent border-t-white"></div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section id="timeline" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            EDUCATION & ACTIVITIES
          </h2>
          <div className="relative pl-20">
            <div className="absolute left-12 h-full border-l-2 border-slate-200"></div>
            <div id="timeline-content">
              {timelineData.map(
                (item: { period: string; title: string; description?: string }, index: number) => (
                  <div key={index} className="relative pb-8 timeline-item">
                    <p className="text-sm text-slate-500">{item.period}</p>
                    <h4 className="font-bold text-slate-800 mt-1">{item.title}</h4>
                    {item.description && <p className="text-slate-600">{item.description}</p>}
                  </div>
                )
              )}
            </div>
          </div>
        </section>
        <footer className="text-center text-slate-500 pt-8 border-t"></footer>
      </div>
    </div>
  );
}

export default App;
