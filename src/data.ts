export const projectData = {
	toudeuk: {
		title: "클릭 게임 서비스 '터득(TOUDEUK)'",
		summary:
			"동시 클릭 환경에서 발생하는 동시성 문제를 해결하고, 검색 성능을 최적화하여 안정적인 클릭 기반 보상 플랫폼을 구축했습니다.",
		period: "2024.10.02 ~ 2024.11.20",
		role: "결제 API 트랜잭션 분리 · 클릭 동시성 처리 · TPS 6.5배 성능 최적화 · 모니터링 환경 구축",
		tech: ["Spring Boot", "JPA", "MySQL", "AWS(ECS)", "Redis", "Kafka", "Jenkins", "Prometheus", "Grafana", "nGrinder"],
		actions: [
			{
				title: "🔐 결제 API 트랜잭션 분리",
				problem: "외부 결제 API와 DB를 하나의 트랜잭션으로 처리하여 정합성 문제와 커넥션 장시간 점유 이슈가 발생했습니다.",
				solution: "결제 승인과 아이템 지급 로직을 트랜잭션 분리하고, 스케줄링 + 재시도(3회) + Slack 알람으로 자동·수동 복구 구조를 구현했습니다.",
				result: "RestTemplate·트랜잭션 timeout 설정으로 커넥션 점유 시간을 최소화하고, 장애 시 자동 복구가 가능한 안정적인 결제 흐름을 확보했습니다.",
			},
			{
				title: "⚡ 클릭 기능 동시성 문제 해결",
				problem: "다수 사용자가 동시에 클릭할 때 클릭 수 불일치 및 보상자 중복 문제가 발생했습니다.",
				solution: "synchronized · DB 락 · 분산락을 비교 분석 후, 단순 증가 연산의 특성에 최적인 Redis INCR 원자 연산을 채택했습니다.",
				result: "TPS 약 4배 향상, 분산 환경에서도 안정적인 보상 로직을 구현했습니다.",
			},
			{
				title: "🚀 아키텍처 확장을 통한 성능 개선",
				problem: "클릭 고부하 환경에서 TPS 70, MTT 1200ms의 심각한 성능 병목이 발생했습니다.",
				solution: "Redis INCR(클릭 수 분리) + Kafka(로그 비동기 처리) + Thread/Connection Pool 튜닝을 단계적으로 적용했습니다.",
				result: "TPS 70 → 550 (685% 향상), MTT 1200ms → 150ms로 개선했습니다.",
			},
			{
				title: "🔍 검색 최적화 및 DB 인프라 고도화",
				problem: "LIKE 검색 방식으로 인해 검색 응답 시간이 4700ms에 달하는 심각한 성능 저하가 있었습니다.",
				solution: "Full-Text Search 전환 및 MySQL Master-Replica 이중화로 읽기 부하를 분산했습니다.",
				result: "검색 응답 시간 4700ms → 25ms (99.47% 단축)를 달성했습니다.",
			},
		],
		results: [
			{
				title: "동시성 처리량 685% 향상 (TPS 70 → 550)",
				detail:
					"Redis INCR 원자 연산 + Kafka 비동기 처리 + Thread/Connection Pool 튜닝을 단계적으로 적용하여 TPS를 70에서 550으로, MTT는 1200ms에서 150ms로 단축했습니다.",
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
					"Full-Text Search 적용으로 기프티콘 검색 응답 시간을 4700ms에서 25ms로 단축했습니다. MySQL Master-Replica 구조로 DB 읽기 부하도 효과적으로 분산했습니다.",
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
		period: "2024.08.26 ~ 2024.10.11",
		role: "CRUD API/결제 구현 · Docker 인프라 구축 · Jenkins 배포 자동화",
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
		actions: [
			{
				title: "📍 주변 도서 검색 속도 개선",
				problem: "매 요청마다 DB에서 거리를 계산하는 방식으로 인해 평균 4.5초의 응답 지연이 발생했습니다.",
				solution: "PostgreSQL(PostGIS) 공간 인덱스를 도입하고 Redis 캐싱을 추가 적용했습니다.",
				result: "주변 도서 검색 응답 시간 4.5초 → 300ms (93% 개선)을 달성했습니다.",
			},
			{
				title: "💬 실시간 채팅 시스템 아키텍처 설계",
				problem: "다양한 메시지 타입 지원과 고빈도 쓰기 성능이 동시에 필요했습니다.",
				solution: "쓰기 성능에 강한 MongoDB를 채택하고, STOMP·RabbitMQ로 비동기 메시지 처리 구조를 설계했습니다.",
				result: "다수 동시 접속 환경에서도 안정적인 실시간 채팅 서비스를 제공했습니다.",
			},
			{
				title: "🏗️ 인프라 구축 및 무중단 배포",
				problem: "팀 전체가 공유할 수 있는 일관된 개발·배포 환경이 부재했습니다.",
				solution: "Docker 컨테이너화 + Jenkins CI/CD 자동화 + MatterMost 알림을 연동했습니다.",
				result: "무중단 배포를 구성하고 빌드/배포 상태 자동 알림으로 팀 운영 효율을 높였습니다.",
			},
			{
				title: "🔑 인증 및 검색 경험 향상",
				problem: "소셜 로그인과 검색어 자동완성 기능의 API·UI 통합 구현이 필요했습니다.",
				solution: "OAuth2·JWT·Redis 기반 인증 시스템과 Redis Sorted Set 활용 검색어 자동완성을 직접 구현했습니다.",
				result: "API부터 UI까지 인증 End-to-End를 구현하고 사용자 경험을 향상시켰습니다.",
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
					"위치 검색, 실시간 채팅 등 주요 기능의 API 설계부터 UI 구현, 인프라 관리까지 모든 개발 단계를 책임지고 성공적으로 구현했습니다.",
			},
		],
	},
	ssapick: {
		title: "익명 투표 서비스 'SSAPICK'",
		summary:
			"레이어별 단위 테스트 자동화와 안정적인 API 설계를 통해 사용자 참여를 유도한 SSAFY 교육생 익명 커뮤니티 서비스를 개발했습니다.",
		period: "2024.07.02 ~ 2024.08.06",
		role: "주요 API 개발/ERD 설계 · 레이어별 단위테스트 141개 · API 문서 자동화 · CI/CD 파이프라인",
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
		actions: [
			{
				title: "🧪 레이어별 단위 테스트 자동화",
				problem: "잦은 기능 변경으로 배포 안정성 확보가 어렵고, 디버깅에 과도한 시간이 소요됐습니다.",
				solution: "Presentation(48) · Business(61) · Persistence(32) 레이어별 141개 단위 테스트를 작성하고 Jenkins 빌드 전 검증을 연동했습니다.",
				result: "비정상 로직 배포를 원천 차단하여 개발/디버깅 시간을 50% 단축했습니다.",
			},
			{
				title: "🔒 독립적 테스트 환경 구축",
				problem: "운영 DB를 직접 사용하는 테스트는 데이터 오염과 사이드 이펙트 위험이 있었습니다.",
				solution: "TestContainers로 PostgreSQL·Redis 격리 환경을 구성하고, @SQL 어노테이션으로 시나리오 시뮬레이션했습니다.",
				result: "운영 데이터 영향 없이 신뢰도 높은 테스트 환경을 확보했습니다.",
			},
			{
				title: "📄 테스트 기반 API 문서 자동화",
				problem: "API 변경 시 문서가 코드와 불일치하는 문제가 빈번히 발생했습니다.",
				solution: "RestDocs + Swagger를 연동하여 테스트 통과 시에만 문서가 갱신되는 구조를 구현했습니다.",
				result: "API 변경 시 즉각 테스트 실패를 감지하고, 항상 최신 상태의 신뢰 가능한 문서를 유지했습니다.",
			},
			{
				title: "⚡ 조회 최적화 및 N+1 문제 해결",
				problem: "ORM 사용 시 N+1 쿼리가 발생하고, 조회 트래픽이 쓰기보다 압도적으로 많아 성능 저하가 있었습니다.",
				solution: "Fetch Join으로 N+1을 제거하고, Redis Write-Through 캐싱 전략을 적용했습니다.",
				result: "조회 성능을 개선하고 DB-캐시 간 데이터 정합성을 보장했습니다.",
			},
		],
		results: [
			{
				title: "레이어별 단위 테스트 141개로 개발/디버깅 시간 50% 단축",
				detail:
					"Presentation(48개), Business(61개), Persistence(32개) 레이어별 테스트 케이스를 체계적으로 작성했습니다. Jenkins CI 파이프라인에 테스트 검증을 통합하여 비정상 코드 배포를 원천 차단했습니다.",
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
			level: 3,
			description:
				"OOP와 SOLID 원칙을 적용하여 응집력 있고 유지보수 가능한 객체지향 설계를 추구합니다. Stream을 사용한 함수형 프로그래밍에 능통합니다.",
		},
		{
			name: "TypeScript",
			icon: "iconify:logos:typescript-icon",
			level: 2,
			description:
				"정적 타입과 strictNullChecks로 코드 안정성을 높이고 컴파일 시 오류를 방지합니다.",
		},
		{
			name: "SQL",
			icon: "iconify:vscode-icons:file-type-sql",
			level: 2,
			description:
				"관계형 DB에 맞는 ERD를 설계하고, 다중 JOIN 쿼리와 인덱스로 성능을 최적화합니다.",
		},
	],
	"Frameworks & Libraries": [
		{
			name: "Spring Boot",
			icon: "iconify:logos:spring-icon",
			level: 3,
			description:
				"Spring Security, OAuth2, JPA, QueryDSL을 활용하여 인증·인가 및 동적 쿼리를 구현합니다.",
		},
		{
			name: "JPA",
			icon: "iconify:simple-icons:hibernate",
			level: 3,
			description:
				"영속성 컨텍스트와 엔티티 생명주기를 이해하고, N+1 문제 해결 및 Fetch Join 최적화에 능숙합니다.",
		},
		{
			name: "QueryDSL",
			icon: "iconify:simple-icons:hibernate",
			level: 2,
			description:
				"타입 안전한 동적 쿼리 작성이 가능하며, 복잡한 조회 로직을 깔끔하게 구현합니다.",
		},
		{
			name: "Node.js",
			icon: "iconify:logos:nodejs-icon",
			level: 1,
			description: "Express 기반 REST API 개발 경험이 있습니다.",
		},
	],
	Database: [
		{
			name: "MySQL",
			icon: "iconify:logos:mysql",
			level: 3,
			description:
				"인덱스 설계, 쿼리 최적화, Master-Replica 구조 구축, Full-Text Search 최적화 경험이 있습니다.",
		},
		{
			name: "PostgreSQL(PostGIS)",
			icon: "iconify:logos:postgresql",
			level: 2,
			description:
				"PostGIS를 활용한 위치 기반 서비스 개발 및 공간 인덱스 성능 최적화 경험이 있습니다.",
		},
		{
			name: "MongoDB",
			icon: "iconify:logos:mongodb-icon",
			level: 1,
			description: "NoSQL 데이터 모델링과 채팅 데이터 저장소로 활용한 경험이 있습니다.",
		},
	],
	"Infra & DevOps": [
		{
			name: "AWS (EC2, S3)",
			icon: "iconify:logos:aws",
			level: 2,
			description:
				"EC2 인스턴스 관리와 S3 호스팅, IAM 설정과 VPC 구성 경험이 있습니다.",
		},
		{
			name: "Docker",
			icon: "iconify:logos:docker-icon",
			level: 2,
			description:
				"다양한 프로젝트 컨테이너화, 도커 컴포즈를 사용한 멀티 컨테이너 환경 구성이 가능합니다.",
		},
		{
			name: "Jenkins",
			icon: "iconify:logos:jenkins",
			level: 2,
			description:
				"파이프라인 작성으로 CI/CD를 자동화하고, Blue/Green 배포로 무중단 배포를 구성했습니다.",
		},
		{
			name: "Prometheus",
			icon: "iconify:logos:prometheus",
			level: 1,
			description: "시스템 메트릭 수집과 모니터링 대시보드 구축 경험이 있습니다.",
		},
		{
			name: "Grafana",
			icon: "iconify:logos:grafana",
			level: 1,
			description: "Prometheus와 연동하여 실시간 모니터링 대시보드를 구축했습니다.",
		},
	],
	"Message Queue & Cache": [
		{
			name: "Redis",
			icon: "iconify:logos:redis",
			level: 2,
			description:
				"분산 락, INCR 원자 연산, 캐싱, Sorted Set을 활용하여 동시성 제어와 성능 최적화 문제를 해결했습니다.",
		},
		{
			name: "Kafka",
			icon: "iconify:logos:kafka-icon",
			level: 1,
			description:
				"이벤트 기반 아키텍처를 이해하고, 로그 저장 비동기 처리에 적용한 경험이 있습니다.",
		},
		{
			name: "RabbitMQ",
			icon: "iconify:logos:rabbitmq-icon",
			level: 1,
			description: "STOMP 프로토콜을 활용한 실시간 메시징 시스템 구축 경험이 있습니다.",
		},
	],
	"Tools & Collaboration": [
		{
			name: "Git",
			icon: "iconify:logos:git-icon",
			level: 2,
			description:
				"브랜치 전략과 Merge Conflict 해결에 능숙하며, PR 기반 코드 리뷰 문화에 익숙합니다.",
		},
		{
			name: "Jira",
			icon: "iconify:logos:jira",
			level: 2,
			description: "Epic-Story-Task 구조로 이슈 관리와 스프린트 계획 수립이 가능합니다.",
		},
		{
			name: "Notion",
			icon: "iconify:logos:notion-icon",
			level: 2,
			description: "팀 문서화와 협업에 적극 활용합니다.",
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
