export const projectData = {
  toudeuk: {
    title: "클릭 게임 서비스 '터득(TOUDEUK)'",
    summary:
      "대규모 트래픽 환경에서 발생하는 동시성 문제를 해결하고, 검색 성능을 최적화하여 안정적인 클릭 기반 보상 플랫폼을 구축했습니다.",
    meta: [
      { icon: "fa-calendar-alt", text: "2024.10.02 ~ 2024.11.20" },
      { icon: "fa-user-friends", text: "Infra, Back-End 담당" },
    ],
    tech: ["Spring Boot", "JPA", "MySQL", "Redis", "Kafka", "Jenkins", "Prometheus", "Grafana"],
    situation:
      "다수의 사용자가 동시에 클릭하는 서비스 특성상, 대규모 트래픽 발생 시 데이터 부정합 문제와 심각한 시스템 성능 저하가 발생했습니다.",
    task: "가상 사용자(VUser) 100명의 동시 접속 환경에서도 높은 처리량과 빠른 응답 시간을 보장하는 것을 목표로, 동시성 제어, 병목 현상 개선, 인프라 안정화를 주요 과제로 삼았습니다.",
    actions: [
      {
        title: "동시성 제어 최적화",
        detail:
          "초기 비관적 락 방식의 처리량 한계를 극복하고자 Redis 분산 락을 적용하여 동시성 문제를 해결했습니다.",
      },
      {
        title: "검색 성능 개선",
        detail:
          "LIKE 검색(4700ms)을 Full-Text Search(25ms)로 전환하고, MySQL Master-Replica 구조로 DB 부하를 분산했습니다.",
      },
      {
        title: "인프라 구축 및 안정화",
        detail:
          "Jenkins, Prometheus, Grafana를 이용해 CI/CD 파이프라인 및 시스템 모니터링 환경을 구축하여 운영 효율성을 높였습니다.",
      },
      {
        title: "성능 측정 및 검증",
        detail:
          "nGrinder를 활용해 VUser 100명 규모의 부하 테스트를 진행하며, 각 개선 단계별 TPS와 MTT를 정량적으로 측정하고 검증했습니다.",
      },
    ],
    results: [
      {
        title: "동시성 처리량 685% 향상",
        detail:
          "Redis 분산 락 도입으로 TPS는 70에서 550으로, MTT는 1200ms에서 150ms로 단축하며 대규모 동시 요청을 안정적으로 처리했습니다.",
        chart: {
          type: "bar" as const,
          data: {
            labels: ["TPS (초당 트랜잭션)", "MTT (평균 응답 시간)"],
            datasets: [
              { label: "Before", data: [70, 1200], backgroundColor: "#fca5a5" },
              { label: "After", data: [550, 150], backgroundColor: "#86efac" },
            ],
          },
          options: {
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
            plugins: { title: { display: true, text: "TPS & MTT 성능 비교" } },
          },
        },
      },
      {
        title: "검색 응답 시간 99.4% 단축",
        detail:
          "Full-Text Search 적용으로 기프티콘 검색 응답 시간을 4700ms에서 25ms로 단축시켜 사용자 경험을 극대화했습니다.",
        chart: {
          type: "bar" as const,
          data: {
            labels: ["검색 응답 시간 (ms)"],
            datasets: [
              { label: "Before (LIKE)", data: [4700], backgroundColor: "#fca5a5" },
              { label: "After (Full-Text)", data: [25], backgroundColor: "#86efac" },
            ],
          },
          options: {
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
            plugins: { title: { display: true, text: "검색 성능 비교" } },
          },
        },
      },
    ],
  },
  library: {
    title: "중고 도서 공유 서비스 ‘나의 작은 도서관’",
    summary:
      "위치 기반 기술과 추천 시스템을 적용하여, 동네 주민 간 중고 도서를 공유하고 대여하는 플랫폼을 End-to-End로 개발했습니다.",
    meta: [
      { icon: "fa-calendar-alt", text: "2024.08.26 ~ 2024.10.11" },
      { icon: "fa-user-friends", text: "Infra, Back-End, Front-End 담당" },
    ],
    tech: [
      "Spring Boot",
      "JPA",
      "QueryDSL",
      "PostGIS",
      "MongoDB",
      "Redis",
      "RabbitMQ",
      "React",
      "Docker",
    ],
    situation:
      "사용자가 위치 주변의 대여 가능 도서를 검색할 때 매번 DB에서 거리를 계산하는 방식으로 인해 응답 지연이 발생했으며, 실시간 채팅 등 핵심 기능들을 안정적으로 개발/배포할 통합 시스템과 인프라가 필요했습니다.",
    task: "Infra, Back-End, Front-End 역할을 모두 수행하며 핵심 기능들의 End-to-End 개발을 책임졌습니다. 위치 기반 검색 성능 최적화, 안정적인 실시간 채팅 시스템 구축, 팀원들을 위한 개발 환경 컨테이너화를 최우선 목표로 삼았습니다.",
    actions: [
      {
        title: "위치 기반 서비스 풀스택 개발",
        detail:
          "Back-End: PostGIS와 Redis 캐싱으로 검색 API 성능을 최적화.\nFront-End: React를 사용하여 주변 도서를 직관적으로 확인할 수 있는 지도 및 목록 UI를 구현.",
      },
      {
        title: "실시간 채팅 기능 End-to-End 구현",
        detail:
          "Back-End: RabbitMQ와 MongoDB로 안정적인 비동기 메시징 시스템을 구축.\nFront-End: 웹소켓(STOMP)을 연동하여 실시간 채팅 UI/UX 전체를 개발.",
      },
      {
        title: "인프라 환경 컨테이너화",
        detail:
          "백엔드 및 AI 서버를 Docker 컨테이너화하여 팀원들에게 일관된 개발 환경을 제공하고, Jenkins와 MatterMost를 연동하여 빌드/배포 알림을 자동화.",
      },
      {
        title: "인증 및 검색 경험 향상",
        detail:
          "OAuth2, JWT, Redis 기반의 소셜 로그인/인증 시스템과 Redis Sorted Set을 활용한 검색어 자동 완성 기능을 API부터 UI까지 직접 구현.",
      },
    ],
    results: [
      {
        title: "위치 기반 검색 속도 93% 개선",
        detail:
          "백엔드 캐싱 최적화를 통해 내 주변 도서 검색 응답 시간을 평균 4.5초에서 300ms 이내로 단축했습니다.",
        chart: {
          type: "bar" as const,
          data: {
            labels: ["주변 도서 검색 시간 (ms)"],
            datasets: [
              { label: "Before", data: [4500], backgroundColor: "#fca5a5" },
              { label: "After", data: [300], backgroundColor: "#86efac" },
            ],
          },
          options: {
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
            plugins: { title: { display: true, text: "위치 기반 검색 성능 비교" } },
          },
        },
      },
      {
        title: "풀스택 개발을 통한 핵심 기능 출시",
        detail:
          "위치 검색, 실시간 채팅 등 주요 기능의 API 설계부터 UI 구현, 인프라 관리까지 모든 개발 단계를 책임지고 성공적으로 구현하며 풀스택 역량을 입증했습니다.",
      },
    ],
  },
  ssapick: {
    title: "익명 투표 서비스 ‘SSAPICK’",
    summary:
      "AI 모델을 활용한 중복 질문 방지 및 테스트 자동화에 중점을 둔 SSAFY 교육생 커뮤니티 서비스를 개발했습니다.",
    meta: [
      { icon: "fa-calendar-alt", text: "2024.07.02 ~ 2024.08.06" },
      { icon: "fa-user-friends", text: "Back-End 담당" },
    ],
    tech: [
      "Spring Boot",
      "JPA",
      "QueryDSL",
      "Redis",
      "FastAPI",
      "Docker",
      "Mockito",
      "TestContainers",
      "RestDocs",
    ],
    situation:
      "익명 커뮤니티의 특성상 발생하는 욕설, 불쾌한 표현, 동일한 내용의 질문 반복 등록을 방지하여 건전한 커뮤니티 환경을 조성할 필요가 있었습니다. 또한, 잦은 기능 변경에 대응하기 위한 안정적인 테스트 및 API 문서화 프로세스가 부재했습니다.",
    task: "백엔드 개발자로서 AI 모델을 활용한 욕설 및 중복 질문 필터링 시스템을 구축하고, 독립적인 테스트 환경과 API 문서 자동화 파이프라인을 만드는 것을 목표로 했습니다.",
    actions: [
      {
        title: "AI 기반 중복 질문 방지 시스템 구축",
        detail:
          "SBERT 언어 모델을 FastAPI 서버에 배포하여, 문장 간 코사인 유사도를 측정하는 방식으로 의미적으로 유사한 중복 질문 등록을 방지했습니다.",
      },
      {
        title: "테스트 자동화",
        detail:
          "Mockito와 TestContainers를 사용하여 각 계층별 독립적인 테스트 환경을 구축하고, 모든 로직의 테스트 코드를 작성하며 N+1 문제를 해결했습니다.",
      },
      {
        title: "API 문서 자동화",
        detail:
          "RestDocs와 Swagger를 연동하여 테스트 코드 기반으로 API 문서를 자동으로 생성 및 배포하는 프로세스를 구축했습니다.",
      },
      {
        title: "성능 최적화",
        detail:
          "자주 조회되는 질문 목록을 Redis Write-Through 캐싱 전략으로 관리하여 DB 부하를 줄이고 조회 성능을 최적화했습니다.",
      },
    ],
    results: [
      {
        title: "AI 기반 콘텐츠 필터링 시스템 구현",
        detail:
          "의미적 유사도 기반의 고도화된 중복 질문 방지 로직을 성공적으로 구현하여 커뮤니티의 질적 향상에 기여했습니다.",
      },
      {
        title: "테스트 주도 API 개발 및 자동화된 문서화 프로세스 구축",
        detail: "코드 변경 시 안정성을 확보하고, 프론트엔드와의 협업 효율성을 크게 향상시켰습니다.",
      },
    ],
  },
};

export const skillsData = {
  Languages: [
    { name: "Java", icon: "fa-brands fa-java" },
    { name: "Python", icon: "fa-brands fa-python" },
    { name: "JavaScript", icon: "fa-brands fa-js" },
    { name: "SQL", icon: "fa-solid fa-database" },
  ],
  "Frameworks & Libraries": [
    { name: "Spring Boot", icon: "fa-solid fa-leaf" },
    { name: "JPA", icon: "fa-solid fa-layer-group" },
    { name: "QueryDSL", icon: "fa-solid fa-filter" },
    { name: "Django", icon: "fa-brands fa-python" },
    { name: "FastAPI", icon: "fa-solid fa-bolt" },
  ],
  Database: [
    { name: "MySQL", icon: "fa-solid fa-database" },
    { name: "PostgreSQL(PostGIS)", icon: "fa-solid fa-database" },
    { name: "MongoDB", icon: "fa-solid fa-database" },
  ],
  "Infra & DevOps": [
    { name: "AWS (ECC2, S3)", icon: "fa-brands fa-aws" },
    { name: "Docker", icon: "fa-brands fa-docker" },
    { name: "Jenkins", icon: "fa-brands fa-jenkins" },
    { name: "Prometheus", icon: "fa-solid fa-chart-line" },
    { name: "Grafana", icon: "fa-solid fa-chart-bar" },
  ],
  "Message Queue & Cache": [
    { name: "Kafka", icon: "fa-solid fa-stream" },
    { name: "RabbitMQ", icon: "fa-solid fa-comments" },
    { name: "Redis", icon: "fa-solid fa-memory" },
  ],
  "Tools & Collaboration": [
    { name: "Git", icon: "fa-brands fa-git-alt" },
    { name: "Jira", icon: "fa-brands fa-jira" },
    { name: "Notion", icon: "fa-solid fa-book" },
    { name: "MatterMost", icon: "fa-solid fa-comment-dots" },
    { name: "Figma", icon: "fa-brands fa-figma" },
  ],
};

export const timelineData = [
  {
    period: "2024.01 - 2024.12",
    title: "삼성 청년 SW 아카데미 (SSAFY) 11기 수료",
    description: "Java 트랙",
  },
  {
    period: "2017.03 - 2023.02",
    title: "강원대학교 졸업",
    description: "컴퓨터정보통신공학부",
  },
  { period: "2022.09 - 2022.12", title: "지마켓 산학 협력 프로젝트 참여", description: "" },
];
