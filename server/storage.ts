import { type Article, type InsertArticle, type Category, type InsertCategory, type Author, type InsertAuthor } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Articles
  getArticles(): Promise<Article[]>;
  getArticleById(id: string): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  getFeaturedArticles(): Promise<Article[]>;
  getLatestArticles(limit?: number): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  searchArticles(query: string): Promise<Article[]>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Author
  getAuthor(): Promise<Author | undefined>;
  createAuthor(author: InsertAuthor): Promise<Author>;
}

export class MemStorage implements IStorage {
  private articles: Map<string, Article>;
  private categories: Map<string, Category>;
  private author: Author | undefined;

  constructor() {
    this.articles = new Map();
    this.categories = new Map();
    this.author = undefined;
    this.seedData();
  }

  private async seedData() {
    // Seed categories
    const categoriesData: InsertCategory[] = [
      {
        name: "DevOps",
        slug: "devops",
        description: "Automação, CI/CD, infraestrutura como código e melhores práticas de DevOps.",
        icon: "fas fa-cogs",
        color: "navy",
        articleCount: 12
      },
      {
        name: "Kubernetes",
        slug: "kubernetes",
        description: "Orquestração de containers, deployment strategies e gerenciamento de clusters.",
        icon: "fas fa-dharmachakra",
        color: "blue",
        articleCount: 8
      },
      {
        name: "Security",
        slug: "security",
        description: "Segurança em cloud, compliance, monitoramento e gestão de vulnerabilidades.",
        icon: "fas fa-shield-alt",
        color: "red",
        articleCount: 10
      },
      {
        name: "AWS",
        slug: "aws",
        description: "Serviços AWS, arquiteturas cloud-native e otimização de custos.",
        icon: "fab fa-aws",
        color: "orange",
        articleCount: 15
      },
      {
        name: "Cloud",
        slug: "cloud",
        description: "Estratégias multi-cloud, migração e arquiteturas distribuídas.",
        icon: "fas fa-cloud",
        color: "green",
        articleCount: 9
      },
      {
        name: "FinOps",
        slug: "finops",
        description: "Otimização de custos cloud, governança financeira e métricas de ROI.",
        icon: "fas fa-chart-line",
        color: "purple",
        articleCount: 6
      }
    ];

    for (const categoryData of categoriesData) {
      await this.createCategory(categoryData);
    }

    // Seed author
    const authorData: InsertAuthor = {
      name: "Amadeu Dias",
      title: "Cloud Architect",
      bio: "Sou especialista em Cloud Computing, com foco em AWS, DevOps, infraestrutura como código (Terraform) e modernização de aplicações. Tenho experiência prática com arquitetura de soluções, automação de ambientes, segurança na nuvem, containers (Docker, Kubernetes) e CI/CD. No blog, compartilho experiências reais de projetos, aprendizados em certificações, boas práticas e tutoriais técnicos voltados para profissionais de tecnologia que buscam evoluir na carreira em cloud e DevOps.",
      location: "Goiânia - GO",

      certification: "Solutions Architect AWS",
      imageUrl: "/src/assets/profile-photo.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/amadeu-dias-158b8a146/",
      githubUrl: "https://github.com/amadeudias",
      twitterUrl: "https://www.instagram.com/amadeudiasaws/"
    };

    await this.createAuthor(authorData);

    // Seed articles
    const articlesData: InsertArticle[] = [
      {
        title: "Implementando CI/CD com Jenkins e Docker",
        slug: "implementando-cicd-jenkins-docker",
        excerpt: "Aprenda a configurar um pipeline completo de CI/CD usando Jenkins e Docker para automatizar seus deployments...",
        content: "Conteúdo completo do artigo sobre CI/CD com Jenkins e Docker...",
        category: "DevOps",
        tags: ["DevOps", "Jenkins", "Docker", "CI/CD"],
        readTime: 5,
        featured: true,
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        codePreview: `pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t myapp .'
            }
        }
    }
}`
      },
      {
        title: "Kubernetes: Gerenciamento de Recursos e Autoscaling",
        slug: "kubernetes-gerenciamento-recursos-autoscaling",
        excerpt: "Domine as estratégias de gerenciamento de recursos no Kubernetes e implemente autoscaling eficiente...",
        content: "Conteúdo completo do artigo sobre Kubernetes...",
        category: "Kubernetes",
        tags: ["Kubernetes", "Autoscaling", "Resources"],
        readTime: 8,
        featured: true,
        imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        codePreview: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: php-apache
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: php-apache
  minReplicas: 1
  maxReplicas: 10`
      },
      {
        title: "Segurança na AWS: IAM e Compliance",
        slug: "seguranca-aws-iam-compliance",
        excerpt: "Estratégias essenciais para implementar segurança robusta na AWS com foco em IAM policies e compliance...",
        content: "Conteúdo completo do artigo sobre segurança AWS...",
        category: "Security",
        tags: ["AWS", "Security", "IAM", "Compliance"],
        readTime: 6,
        featured: true,
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        codePreview: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::mybucket/*"
    }
  ]
}`
      },
      {
        title: "Infraestrutura como Código com Terraform na AWS",
        slug: "infraestrutura-codigo-terraform-aws",
        excerpt: "Descubra como implementar infraestrutura como código usando Terraform para provisionar recursos AWS de forma eficiente e escalável. Incluindo exemplos práticos de módulos reutilizáveis.",
        content: "Conteúdo completo do artigo sobre Terraform...",
        category: "DevOps",
        tags: ["DevOps", "Terraform", "AWS", "IaC"],
        readTime: 7,
        featured: false,
        imageUrl: "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        codePreview: `resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1d0"
  instance_type = "t3.micro"
  
  tags = {
    Name = "WebServer"
  }
}`
      },
      {
        title: "Monitoramento Avançado com Prometheus e Grafana",
        slug: "monitoramento-avancado-prometheus-grafana",
        excerpt: "Implemente um sistema completo de monitoramento para clusters Kubernetes usando Prometheus para coleta de métricas e Grafana para visualização, incluindo alertas customizados.",
        content: "Conteúdo completo do artigo sobre monitoramento...",
        category: "Kubernetes",
        tags: ["Kubernetes", "Monitoring", "Prometheus", "Grafana"],
        readTime: 10,
        featured: false,
        imageUrl: "https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        codePreview: `apiVersion: v1
kind: ServiceMonitor
metadata:
  name: app-monitor
spec:
  selector:
    matchLabels:
      app: my-app`
      },
      {
        title: "Estratégias de Otimização de Custos AWS",
        slug: "estrategias-otimizacao-custos-aws",
        excerpt: "Reduza seus custos AWS em até 40% com estratégias comprovadas de FinOps. Aprenda sobre Reserved Instances, Spot Instances, rightsizing e governança de recursos.",
        content: "Conteúdo completo do artigo sobre FinOps...",
        category: "FinOps",
        tags: ["FinOps", "AWS", "Cost Optimization"],
        readTime: 12,
        featured: false,
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        codePreview: `# AWS CLI para análise de custos
aws ce get-cost-and-usage \\
  --time-period Start=2024-01-01,End=2024-12-31 \\
  --granularity MONTHLY \\
  --metrics BlendedCost`
      }
    ];

    for (const articleData of articlesData) {
      await this.createArticle(articleData);
    }
  }

  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).sort((a, b) => 
      new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
    );
  }

  async getArticleById(id: string): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(
      (article) => article.slug === slug
    );
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter((article) => article.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter((article) => article.featured)
      .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
  }

  async getLatestArticles(limit: number = 5): Promise<Article[]> {
    return Array.from(this.articles.values())
      .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime())
      .slice(0, limit);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const article: Article = {
      ...insertArticle,
      id,
      publishedAt: new Date(),
      createdAt: new Date(),
    };
    this.articles.set(id, article);
    return article;
  }

  async searchArticles(query: string): Promise<Article[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.articles.values()).filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = {
      ...insertCategory,
      id,
    };
    this.categories.set(id, category);
    return category;
  }

  async getAuthor(): Promise<Author | undefined> {
    return this.author;
  }

  async createAuthor(insertAuthor: InsertAuthor): Promise<Author> {
    const id = randomUUID();
    const author: Author = {
      ...insertAuthor,
      id,
    };
    this.author = author;
    return author;
  }
}

export const storage = new MemStorage();
