// src/content.config.ts
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

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
  })
});

export const collections = { products, cases };