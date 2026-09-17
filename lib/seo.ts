import type { Metadata } from 'next';
import { company } from '@/data/company';
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
export const isIndexable = !!siteUrl && process.env.SITE_INDEXABLE === 'true';
export function pageMeta(title:string, description:string, path:string): Metadata {
 return {title,description,alternates:siteUrl ? {canonical:`${siteUrl}${path}`} : undefined,openGraph:{title,description,locale:'th_TH',type:'website',siteName:company.siteName,...(siteUrl ? {url:`${siteUrl}${path}`,images:[{url:`${siteUrl}/images/hero-mock.webp`,width:1147,height:584}]} : {})}};
}
export function breadcrumbs(items:{name:string;path:string}[]) {
 return siteUrl ? {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:'หน้าแรก',path:'/'},...items].map((item,i)=>({'@type':'ListItem',position:i+1,name:item.name,item:`${siteUrl}${item.path}`}))} : null;
}
