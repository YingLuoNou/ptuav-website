// src/content.config.ts
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const products = defineCollection({
  // 使用 glob 加载器，指定匹配模式
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // 推荐后续将图片移入 src/assets 以获得优化，暂时保持 string
    image: z.string(), 
    feature: z.boolean().default(false),
    order: z.number().default(99),
    features: z.string().optional(), // 新增：产品特性，使用 '|' 分隔
    category: z.string().default("无人机"), // 新增：产品分类
    date: z.date().optional(),
  })
});

// [新增] 客户案例集合
const cases = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/cases" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),     // 新增：行业分类 (如 "金融科技")
    description: z.string(),
    image: z.string(),        // 对应案例封面图
    cases: z.boolean().default(false), // 控制是否在首页展示
    order: z.number().default(99),
    date: z.coerce.date(),       // 案例发布日期
  })
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(), // 副标题
    image: z.string().optional(),    // 顶部头图
    description: z.string().optional(),
  })
});

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema({
    extend: z.object({
      // 如果您将来需要扩展文档的 frontmatter，可以在这里加
      // 例如：author: z.string().optional()
    }),
  }),
});

export const collections = { products, cases, pages, docs };