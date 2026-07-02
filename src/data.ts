export const projectData = {
	toudeuk: {
		title: "클릭 게임 서비스 '터득(TOUDEUK)'",
		summary:
			"대규모 트래픽 환경에서 발생하는 동시성 문제를 해결하고, 검색 성능을 최적화하여 안정적인 클릭 기반 보상 플랫폼을 구축했습니다.",
		meta: [
			{ icon: "fa-calendar-alt", text: "2024.10.02 ~ 2024.11.20" },
			{ icon: "fa-user-friends", text: "Infra, Back-End 담당" },
		],
		tech: ["Spring Boot", "JPA", "MySQL", "AWS(ECS)", "Redis", "Kafka", "Jenkins", "Prometheus", "Grafana", "nGrinder"],
		situation:
			"다수의 사용자가 동시에 클릭하는 서비스 특성상, 대규모 트래픽 발생 시 데이터 부정합 문제와 심각한 시스템 성능 저하가 발생했습니다.",
		task: "가상 사용자(VUser) 100명의 동시 접속 환경에서도 높은 처리량과 빠른 응답 시간을 보장하는 것을 목표로, 동시성 제어, 병목 현상 개선, 인프라 안정화를 주요 과제로 삼았습니다.",
		actions: [
			{
				title: "🔐 결제 API 트랜잭션 분리",
				detail:
					"외부 결제 API와 DB 반영을 하나의 트랜잭션으로 처리할 경우 정합성 문제와 커넥션 점유 이슈 발생을 인지했습니다.\n결제 승인과 아이템 지급 로직을 트랜잭션 분리하고, 스케줄링 + 재시도(3회) + Slack 알람 시스템을 도입하여 자동/수동 복구 구조를 구현했습니다.\nRestTemplate timeout, 트랜잭션 timeout 설정으로 커넥션 점유 시간을 최소화했습니다.",
			},
			{
				title: "⚡ 클릭 기능 동시성 문제 해결",
				detail:
					"동시 다수 사용자 환경에서 클릭 수 불일치 및 보상자 중복 문제가 발생했습니다.\nsynchronized, DB 락, 분산락 등 다양한 동시성 처리 기법을 비교 분석하여, 단순 증가 연산 특성에 최적인 Redis INCR 원자 연산을 채택했습니다.\n과도한 오버엔지니어링을 지양하며 기능 이해 기반의 실용적 기술 적용으로 TPS 약 4배 향상을 달성했습니다.",
			},
			{
				title: "🚀 아키텍처 확장을 통한 성능 개선",
				detail:
					"클릭 기반 고부하 환경에서 성능 병목을 동시성 처리, 로그 저장, 리소스 풀 튜닝 단계로 구분하여 분석했습니다.\n총 클릭 수는 RDB → Redis INCR로 분리, 로그 저장은 Kafka 비동기 처리로 전환했습니다.\nKafka, Redis, Async 비교 후 안정성 기준으로 Kafka를 채택하고, Thread/Connection Pool 튜닝으로 최종 TPS를 약 6.5배(685%)까지 개선했습니다.",
			},
			{
				title: "🔍 검색 최적화 및 DB 인프라 고도화",
				detail:
					"기존 LIKE 검색을 Full-Text Search로 전환하여 검색 응답 시간을 99.47% 단축(4700ms → 25ms)했습니다.\nMySQL Master-Replica 이중화를 구성하여 DB 읽기 부하를 분산했습니다.\nJenkins, Prometheus, Grafana를 활용한 CI/CD 및 모니터링 환경을 구축하여 운영 효율성을 높였습니다.",
			},
		],
		results: [
			{
				title: "동시성 처리량 685% 향상 (TPS 70 → 550)",
				detail:
					"Redis INCR 원자 연산 + Kafka 비동기 처리 + Thread/Connection Pool 튜닝을 단계적으로 적용하여 TPS를 70에서 550으로, MTT는 1200ms에서 150ms로 단축했습니다. 분산 환경에서도 안정적인 보상 로직을 구현했습니다.",
				chart: {
					type: "bar" as const,
					data: {
						labels: ["TPS (초당 트랜잭션)", "MTT ms (평균 응답 시간)"],
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
				title: "검색 응답 시간 99.47% 단축 (4700ms → 25ms)",
				detail:
					"Full-Text Search 적용으로 기프티콘 검색 응답 시간을 4700ms에서 25ms로 대폭 단축하여 사용자 경험을 극대화했습니다. MySQL Master-Replica 구조로 DB 읽기 부하도 효과적으로 분산했습니다.",
				chart: {
					type: "bar" as const,
					data: {
						labels: ["검색 응답 시간 (ms)"],
						datasets: [
							{ label: "Before (LIKE)", data: [4700], backgroundColor: "#fca5a5" },
							{ label: "After (Full-Text Search)", data: [25], backgroundColor: "#86efac" },
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
		title: "중고 도서 공유 서비스 '나의 작은 도서관'",
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
			"Jenkins",
			"OAuth2",
			"JWT",
			"STOMP",
		],
		situation:
			"사용자가 위치 주변의 대여 가능 도서를 검색할 때 매번 DB에서 거리를 계산하는 방식으로 인해 응답 지연이 발생했으며, 실시간 채팅 등 핵심 기능들을 안정적으로 개발/배포할 통합 시스템과 인프라가 필요했습니다.",
		task: "Infra, Back-End, Front-End 역할을 모두 수행하며 핵심 기능들의 End-to-End 개발을 책임졌습니다. 위치 기반 검색 성능 최적화, 안정적인 실시간 채팅 시스템 구축, 팀원들을 위한 개발 환경 컨테이너화를 최우선 목표로 삼았습니다.",
		actions: [
			{
				title: "📍 주변 도서 검색 속도 개선",
				detail:
					"공간 데이터 쿼리 처리를 위해 PostgreSQL(PostGIS) 도입을 결정하고, 검색 속도 향상을 위해 Redis 캐싱을 추가 적용했습니다.\n이를 통해 주변 도서 검색 속도를 기존 대비 93% 이상 개선(평균 4.5초 → 300ms 이내)했습니다.",
			},
			{
				title: "💬 실시간 채팅 시스템 아키텍처 설계",
				detail:
					"다양한 메시지 형태(이미지, 알림 등)에 대응할 수 있는 유연성과 압도적으로 빈번한 쓰기(Insert) 성능을 고려하여 MongoDB를 데이터 저장소로 채택했습니다.\nSTOMP 연동을 통한 원활한 라우팅과, 다수 사용자 접속 시 메시지 비동기 처리를 위해 RabbitMQ를 도입하여 웹 서버 부하를 분산하고 안정성을 확보했습니다.",
			},
			{
				title: "🏗️ 인프라 고도화 및 무중단 배포",
				detail:
					"Docker 기반 컨테이너화 및 Jenkins를 이용한 CI/CD 배포 자동화를 적용했습니다.\n무중단 배포를 시도하며 시스템 아키텍처 및 인프라 운영 환경에 대한 이해를 넓혔습니다.\nMatterMost 연동으로 빌드/배포 알림을 자동화하여 팀 전체의 운영 효율성을 향상시켰습니다.",
			},
			{
				title: "🔑 인증 및 검색 경험 향상",
				detail:
					"OAuth2, JWT, Redis 기반의 소셜 로그인/인증 시스템을 API부터 UI까지 직접 구현했습니다.\nRedis Sorted Set을 활용한 검색어 자동 완성 기능을 구현하여 사용자 경험을 향상시켰습니다.",
			},
		],
		results: [
			{
				title: "위치 기반 검색 속도 93% 개선 (4.5초 → 300ms)",
				detail:
					"PostGIS 공간 인덱스와 Redis 캐싱을 결합하여 내 주변 도서 검색 응답 시간을 평균 4.5초에서 300ms 이내로 단축했습니다.",
				chart: {
					type: "bar" as const,
					data: {
						labels: ["주변 도서 검색 시간 (ms)"],
						datasets: [
							{ label: "Before", data: [4500], backgroundColor: "#fca5a5" },
							{ label: "After (PostGIS + Redis)", data: [300], backgroundColor: "#86efac" },
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
		title: "익명 투표 서비스 'SSAPICK'",
		summary:
			"테스트 자동화와 안정적인 API 설계를 통해 사용자 참여를 유도한 SSAFY 교육생 익명 커뮤니티 서비스를 개발했습니다.",
		meta: [
			{ icon: "fa-calendar-alt", text: "2024.07.02 ~ 2024.08.06" },
			{ icon: "fa-user-friends", text: "Back-End 담당" },
		],
		tech: [
			"Spring Boot",
			"JPA",
			"QueryDSL",
			"Redis",
			"Mockito",
			"TestContainers",
			"RestDocs",
			"Swagger",
			"Docker",
			"Jenkins",
		],
		situation:
			"익명 커뮤니티의 특성상 발생하는 욕설, 불쾌한 표현, 동일한 내용의 질문 반복 등록을 방지하여 건전한 커뮤니티 환경을 조성할 필요가 있었습니다. 또한, 잦은 기능 변경에 대응하기 위한 안정적인 테스트 및 API 문서화 프로세스가 부재했습니다.",
		task: "백엔드 개발자로서 레이어별 단위 테스트를 총 141개 작성하고, 독립적인 테스트 환경 구축 및 API 문서 자동화 파이프라인을 만드는 것을 목표로 했습니다.",
		actions: [
			{
				title: "🧪 테스트 자동화로 개발 시간 50% 단축",
				detail:
					"Presentation(48개), Business(61개), Persistence(32개) 등 총 141개의 단위 테스트 케이스를 작성했습니다.\nJenkins에서 빌드 전 테스트 코드를 검증하도록 구성하여, 비정상 로직의 배포를 원천 차단함으로써 전체 개발 및 디버깅 시간을 50% 단축했습니다.",
			},
			{
				title: "🔒 안전한 독립적 테스트 인프라 환경 구축",
				detail:
					"실제 운영 데이터와의 완전한 분리를 위해 TestContainers를 활용하여 PostgreSQL, Redis의 격리된 테스트 환경을 구축했습니다.\n@SQL 어노테이션 기반의 시나리오 시뮬레이션을 통해, 데이터베이스 상태 변조 없는 안전하고 신뢰도 높은 테스트 환경을 구현했습니다.",
			},
			{
				title: "📄 테스트 기반 API 문서화 신뢰성 확보",
				detail:
					"Mock 응답 객체를 생성하여 예상 API 응답을 시뮬레이션하고, 가독성 높은 Swagger 기반 인터랙티브 API 문서를 제공했습니다.\n요청/응답 객체 변경 시 즉각적으로 테스트 실패를 감지하도록 자동화하여 빠른 수정 대응이 가능한 구조를 설계했습니다.",
			},
			{
				title: "⚡ 조회 최적화 및 N+1 문제 해결",
				detail:
					"쓰기보다 조회(Read) 트래픽이 압도적으로 많은 서비스 특성을 반영하여 Redis Write-Through 캐싱 전략을 적용했습니다.\nORM 사용 시 발생하는 N+1 문제를 식별하고 Fetch Join을 적용하여 쿼리 성능을 개선했습니다.",
			},
		],
		results: [
			{
				title: "총 141개 단위 테스트로 개발/디버깅 시간 50% 단축",
				detail:
					"Presentation(48개), Business(61개), Persistence(32개) 레이어별 테스트 케이스를 체계적으로 작성했습니다. Jenkins CI 파이프라인에 테스트 검증을 통합하여 비정상 코드 배포를 원천 차단하고 전체 개발 사이클을 단축했습니다.",
				chart: {
					type: "bar" as const,
					data: {
						labels: ["Presentation", "Business", "Persistence"],
						datasets: [
							{
								label: "테스트 케이스 수",
								data: [48, 61, 32],
								backgroundColor: ["#818cf8", "#60a5fa", "#34d399"],
							},
						],
					},
					options: {
						maintainAspectRatio: false,
						scales: { y: { beginAtZero: true } },
						plugins: { title: { display: true, text: "레이어별 단위 테스트 분포 (총 141개)" } },
					},
				},
			},
			{
				title: "테스트 주도 API 개발 및 자동화된 문서화 프로세스 구축",
				detail:
					"RestDocs + Swagger 연동으로 코드 변경 시 안정성을 확보하고, 프론트엔드와의 협업 효율성을 크게 향상시켰습니다. N+1 문제 해결과 Redis 캐싱으로 조회 성능도 최적화했습니다.",
			},
		],
	},
};

export const skillsData = {
	Languages: [
		{
			name: "Java",
			icon: "iconify:logos:java",
			level: 4,
			description:
				"OOP와 SOLID 원칙을 적용하여 응집력 있고 유지보수 가능한 객체지향 설계를 추구합니다. Stream을 사용한 함수형 프로그래밍에 능통합니다. Optional을 사용하여 NPE를 발생시키지 않도록 노력합니다.",
		},
		{
			name: "TypeScript",
			icon: "iconify:logos:typescript-icon",
			level: 4,
			description:
				"정적 타입과 strictNullChecks로 코드 안정성을 높이고 컴파일 시 오류를 방지합니다. 제네릭, 인터페이스, 유니온 타입으로 유연하고 표현력 있는 코드를 작성합니다.",
		},
		{
			name: "SQL",
			icon: "iconify:vscode-icons:file-type-sql",
			level: 3,
			description:
				"관계형 DB에 맞는 ERD를 설계하고, 정규화와 반정규화를 할 수 있습니다. 다중 JOIN 쿼리와 인덱스를 사용하여 성능을 최적화할 수 있습니다.",
		},
	],
	"Frameworks & Libraries": [
		{
			name: "Spring Boot",
			icon: "iconify:logos:spring-icon",
			level: 4,
			description:
				"Spring Security와 OAuth2를 사용하여 인증·인가 로직을 처리할 수 있습니다. JPA와 QueryDSL에 대한 높은 이해로 동적 쿼리를 구현할 수 있습니다.",
		},
		{
			name: "JPA",
			icon: "iconify:simple-icons:hibernate",
			level: 4,
			description:
				"영속성 컨텍스트와 엔티티 생명주기를 이해하고, N+1 문제를 해결할 수 있습니다. Fetch Join과 배치 사이즈 최적화에 능숙합니다.",
		},
		{
			name: "QueryDSL",
			icon: "iconify:simple-icons:hibernate",
			level: 4,
			description:
				"타입 안전한 동적 쿼리 작성이 가능하며, 복잡한 조회 로직을 깔끔하게 구현할 수 있습니다.",
		},
		{
			name: "Node.js",
			icon: "iconify:logos:nodejs-icon",
			level: 3,
			description: "Express 기반 REST API 개발 경험이 있습니다.",
		},
	],
	Database: [
		{
			name: "MySQL",
			icon: "iconify:logos:mysql",
			level: 4,
			description:
				"인덱스 설계와 쿼리 최적화에 능숙하며, Master-Replica 구조를 구축한 경험이 있습니다. Full-Text Search 최적화 경험이 있습니다.",
		},
		{
			name: "PostgreSQL(PostGIS)",
			icon: "iconify:logos:postgresql",
			level: 3,
			description:
				"PostGIS를 활용한 위치 기반 서비스 개발 경험이 있으며, 공간 인덱스를 활용한 성능 최적화가 가능합니다.",
		},
		{
			name: "MongoDB",
			icon: "iconify:logos:mongodb-icon",
			level: 3,
			description: "NoSQL 데이터 모델링과 집계 파이프라인을 활용한 데이터 처리가 가능합니다.",
		},
	],
	"Infra & DevOps": [
		{
			name: "AWS (EC2, S3)",
			icon: "iconify:logos:aws",
			level: 3,
			description:
				"EC2 인스턴스 관리와 S3를 활용한 정적 파일 호스팅 경험이 있으며, IAM 설정과 VPC 구성이 가능합니다.",
		},
		{
			name: "Docker",
			icon: "iconify:logos:docker-icon",
			level: 3,
			description:
				"다양한 프로젝트를 도커로 빌드한 경험이 있으며, 도커 컴포즈를 사용한 멀티 컨테이너 환경 구성이 가능합니다.",
		},
		{
			name: "Jenkins",
			icon: "iconify:logos:jenkins",
			level: 3,
			description:
				"파이프라인을 작성하여 CI/CD를 자동화할 수 있으며, Blue/Green 배포를 통한 무중단 배포 구성 경험이 있습니다.",
		},
		{
			name: "Prometheus",
			icon: "iconify:logos:prometheus",
			level: 2,
			description: "시스템 메트릭 수집과 모니터링 대시보드 구축 경험이 있습니다.",
		},
		{
			name: "Grafana",
			icon: "iconify:logos:grafana",
			level: 2,
			description: "Prometheus와 연동하여 실시간 모니터링 대시보드를 구축할 수 있습니다.",
		},
	],
	"Message Queue & Cache": [
		{
			name: "Kafka",
			icon: "iconify:logos:kafka-icon",
			level: 2,
			description:
				"이벤트 기반 아키텍처를 이해하고, 로그 저장 비동기 처리에 Kafka를 적용한 경험이 있습니다.",
		},
		{
			name: "RabbitMQ",
			icon: "iconify:logos:rabbitmq-icon",
			level: 3,
			description: "STOMP 프로토콜을 활용한 실시간 메시징 시스템 구축 경험이 있습니다.",
		},
		{
			name: "Redis",
			icon: "iconify:logos:redis",
			level: 4,
			description:
				"분산 락, INCR 원자 연산, 캐싱, Sorted Set을 활용한 다양한 문제 해결 경험이 있습니다. TTL을 활용한 동시성 제어와 성능 최적화에 능숙합니다.",
		},
	],
	"Tools & Collaboration": [
		{
			name: "Git",
			icon: "iconify:logos:git-icon",
			level: 4,
			description:
				"브랜치 전략과 Merge Conflict 해결에 능숙하며, PR 기반 코드 리뷰 문화에 익숙합니다.",
		},
		{
			name: "Jira",
			icon: "iconify:logos:jira",
			level: 3,
			description: "Epic-Story-Task 구조를 이해하고, 이슈 관리와 스프린트 계획 수립이 가능합니다.",
		},
		{
			name: "Notion",
			icon: "iconify:logos:notion-icon",
			level: 4,
			description: "팀 문서화와 협업에 적극 활용합니다.",
		},
		{
			name: "MatterMost",
			icon: "iconify:logos:mattermost-icon",
			level: 3,
			description: "팀 커뮤니케이션 도구로 활용하며, 알림 자동화 연동 경험이 있습니다.",
		},
		{
			name: "Figma",
			icon: "iconify:logos:figma",
			level: 2,
			description: "디자인 시스템을 이해하고, 디자이너와의 협업이 가능합니다.",
		},
	],
};

export const timelineData = [
	{
		period: "2024.01 - 2024.12",
		title: "삼성 청년 SW 아카데미 (SSAFY) 11기 Java 트랙 수료",
		description: "Java 트랙 – 알고리즘, 웹 개발, 프로젝트 4회 수행",
	},
	{
		period: "2022.09 - 2022.12",
		title: "지마켓 산학 협력 프로젝트 참여",
		description: "",
	},
	{
		period: "2017.03 - 2023.08",
		title: "강원대학교 졸업",
		description: "컴퓨터정보통신공학부",
	},
	{
		period: "2014.03 - 2017.02",
		title: "의정부고등학교 졸업",
		description: "",
	},
];
