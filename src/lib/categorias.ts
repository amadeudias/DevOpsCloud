export const CATEGORIAS = {
	devops: {
		nome: 'DevOps',
		descricao: 'CI/CD, automação e cultura de entrega contínua.',
		cor: '#2563eb',
	},
	kubernetes: {
		nome: 'Kubernetes',
		descricao: 'Orquestração de containers, operação e escalabilidade.',
		cor: '#0ea5e9',
	},
	aws: {
		nome: 'AWS',
		descricao: 'Arquitetura de soluções e serviços da Amazon Web Services.',
		cor: '#f59e0b',
	},
	iac: {
		nome: 'Infraestrutura como Código',
		descricao: 'Terraform, módulos reutilizáveis e ambientes reproduzíveis.',
		cor: '#8b5cf6',
	},
	observabilidade: {
		nome: 'Observabilidade',
		descricao: 'Métricas, logs, traces, alertas e resposta a incidentes.',
		cor: '#10b981',
	},
	seguranca: {
		nome: 'Segurança',
		descricao: 'IAM, compliance e proteção de ambientes em nuvem.',
		cor: '#ef4444',
	},
	finops: {
		nome: 'FinOps',
		descricao: 'Visibilidade e otimização de custos na nuvem.',
		cor: '#14b8a6',
	},
} as const;

export type CategoriaSlug = keyof typeof CATEGORIAS;

export const SLUGS_CATEGORIAS = Object.keys(CATEGORIAS) as [CategoriaSlug, ...CategoriaSlug[]];
