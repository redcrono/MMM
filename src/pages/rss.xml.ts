import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const blog = await getCollection('blog');
  const sortedPosts = blog.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: '메가머니모멘텀(MegaMoneyMomentum) | 금융·세무·정책 나침반',
    description: '국세청, 기획재정부, 금융감독원 공공데이터 기반 팩트체크 금융 리서치 미디어',
    site: context.site?.toString() || 'https://megamomo.co.kr',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: [post.data.categoryName],
    })),
    customData: `<language>ko-KR</language>`,
  });
};
