interface Categoria {
	nome: string;
	/** Uma linha, usada em cartões e listagens */
	descricao: string;
	cor: string;
	/** Parágrafo em primeira pessoa que abre a página da área */
	resumo: string;
	/** O que faço na prática nessa área */
	atuacao: string[];
	ferramentas: string[];
	/** Etapas encadeadas, exibidas como um fluxo (opcional) */
	fluxo?: string[];
}

const DADOS = {
	aws: {
		nome: 'AWS',
		descricao: 'Arquitetura de soluções e serviços da Amazon Web Services.',
		cor: '#f59e0b',
		resumo:
			'A AWS é a nuvem em que mais trabalho e na qual sou certificado como Solutions Architect. Meu foco é desenhar arquiteturas que aguentem o dia a dia de produção: disponíveis, seguras e com custo sob controle.',
		atuacao: [
			'Desenho de arquiteturas com alta disponibilidade e recuperação de desastres',
			'Redes com VPC, sub-redes, balanceadores e conectividade com ambientes locais',
			'Migração e modernização de aplicações para a nuvem',
			'Escolha de serviços gerenciados para reduzir o trabalho de operação',
		],
		ferramentas: ['EC2', 'VPC', 'S3', 'RDS', 'EKS', 'Lambda', 'IAM', 'CloudWatch'],
	},
	iac: {
		nome: 'Infraestrutura como Código',
		descricao: 'Terraform, módulos reutilizáveis e ambientes reproduzíveis.',
		cor: '#8b5cf6',
		resumo:
			'Infraestrutura criada à mão no console não se repete, não se revisa e não se audita. Por isso descrevo os ambientes em código, versionados no Git, para que qualquer mudança passe por revisão antes de chegar à produção.',
		atuacao: [
			'Módulos Terraform reutilizáveis entre projetos e ambientes',
			'State remoto e separação entre desenvolvimento, homologação e produção',
			'Plano do Terraform revisado em pull request antes de aplicar',
			'Configuração de servidores com Ansible',
		],
		ferramentas: ['Terraform', 'Ansible', 'Git'],
	},
	kubernetes: {
		nome: 'Kubernetes',
		descricao: 'Orquestração de containers, operação e escalabilidade.',
		cor: '#0ea5e9',
		resumo:
			'Containers resolvem o "na minha máquina funciona", e o Kubernetes resolve como rodar muitos deles com segurança. Trabalho desde a containerização da aplicação até a operação do cluster em produção.',
		atuacao: [
			'Containerização de aplicações com Docker',
			'Implantação e operação de clusters Kubernetes, incluindo o EKS',
			'Escalabilidade automática, health checks e atualizações sem indisponibilidade',
			'Organização de namespaces, recursos e permissões no cluster',
		],
		ferramentas: ['Docker', 'Kubernetes', 'EKS'],
	},
	devops: {
		nome: 'DevOps',
		descricao: 'CI/CD, automação e cultura de entrega contínua.',
		cor: '#2563eb',
		resumo:
			'Entregar com frequência só é seguro quando o caminho até a produção é automático e previsível. Monto pipelines que testam, validam e publicam cada mudança, do commit ao deploy.',
		atuacao: [
			'Pipelines de CI/CD com build, testes e deploy automático',
			'Ambientes de prévia para cada pull request',
			'Automação de tarefas repetitivas de operação',
			'Integração do pipeline com a infraestrutura como código',
		],
		ferramentas: ['GitHub Actions', 'Git', 'Docker', 'Terraform'],
	},
	observabilidade: {
		nome: 'Observabilidade',
		descricao: 'Métricas, logs, alertas e resposta a incidentes.',
		cor: '#10b981',
		resumo:
			'Implemento observabilidade de ponta a ponta com Prometheus, Loki e Grafana, integrada à operação: quando algo sai do normal, a equipe é avisada e o incidente vira um chamado rastreável.',
		atuacao: [
			'Coleta de métricas com Prometheus e de logs com Loki',
			'Painéis no Grafana para acompanhar a saúde dos sistemas',
			'Regras de alerta que avisam a equipe no Microsoft Teams',
			'Abertura automática de chamados no Zendesk, Jira e ServiceNow',
		],
		ferramentas: ['Prometheus', 'Loki', 'Grafana', 'Microsoft Teams', 'Zendesk', 'Jira', 'ServiceNow'],
		fluxo: ['Prometheus', 'Loki', 'Grafana', 'Alerta no Teams', 'Chamado automático'],
	},
	seguranca: {
		nome: 'Segurança',
		descricao: 'IAM, compliance e proteção de ambientes em nuvem.',
		cor: '#ef4444',
		resumo:
			'Segurança na nuvem começa em quem pode fazer o quê. Tenho certificações da Cisco e do Google em cibersegurança e aplico esse olhar a cada ambiente que desenho.',
		atuacao: [
			'Políticas de IAM com privilégio mínimo',
			'Segmentação de rede e proteção de dados em repouso e em trânsito',
			'Gestão de segredos fora do código',
			'Registro e auditoria de ações para atender requisitos de compliance',
		],
		ferramentas: ['IAM', 'KMS', 'CloudTrail', 'Security Groups'],
	},
	finops: {
		nome: 'FinOps',
		descricao: 'Visibilidade e otimização de custos na nuvem.',
		cor: '#14b8a6',
		resumo:
			'A conta da nuvem cresce em silêncio. Aqui escrevo sobre como dar visibilidade aos custos e reduzi-los sem abrir mão da estabilidade.',
		atuacao: [
			'Padrão de tags para saber quem gasta o quê',
			'Orçamentos e alertas de custo',
			'Dimensionamento correto de recursos',
			'Instâncias reservadas, Savings Plans e Spot',
		],
		ferramentas: ['Cost Explorer', 'AWS Budgets'],
	},
} satisfies Record<string, Categoria>;

export type CategoriaSlug = keyof typeof DADOS;

export const CATEGORIAS: Record<CategoriaSlug, Categoria> = DADOS;

export const SLUGS_CATEGORIAS = Object.keys(CATEGORIAS) as [CategoriaSlug, ...CategoriaSlug[]];
