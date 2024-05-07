import { allBlogs } from 'contentlayer/generated';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { Anton } from 'next/font/google';
import Link from 'next/link';

import List from './components/List';

dayjs.extend(isSameOrAfter);

const font = Anton({
    weight: '400',
    subsets: ['latin'],
});

export default function Page() {
    const blogList = allBlogs.sort((a, b) => dayjs(a.date).isSameOrAfter(dayjs(b.date))).slice(0, 5);
    return (
        <>
            <div className="pt-10 pb-6 px-3">
                <h1 className={`flex flex-col text-3xl text-black leading-normal tracking-wider ${font.className}`}>
                    <span>Hello</span>
                    <span></span>
                </h1>
            </div>
            <div className="mt-8">
                <div className="flex items-center justify-between px-3">
                    <h2 className="font-medium text-xl text-gray-800">博客</h2>
                    <Link
                        className="text-gray-400 transition-colors hover:text-gray-600"
                        href="/blog"
                        title="查看全部"
                    ></Link>
                </div>
                <List data={blogList} className="mt-4" />
            </div>
        </>
    );
}
