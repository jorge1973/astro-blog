import type { APIRoute } from "astro";
import rss from '@astrojs/rss'
import { getCollection } from "astro:content";

export const GET:APIRoute=async ({params,request,site})=>{
   const blogPosts=await getCollection('blog');
   return rss({
    stylesheet:'./assets/styles/rss.xsl',
    //`<title>` field in output XML
    title:"George's Blog",
    //`<description>` field in output XML
    description:"Un simple blog sobre mis aventuras con Astro",
    site:site ?? '',
    items:blogPosts.map(({data,slug})=>({
        title:data.title,
        description:data.description,
        pubDate:data.date,
        link:`/posts/${slug}`,
    })),
    //(optional) inject custom fields into the XML
    customData:`<language>en-us</language>`

});
}