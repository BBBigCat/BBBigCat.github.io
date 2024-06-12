import { IconBrandGithub, IconBrandJuejin, IconMail } from '@tabler/icons-react';
import Link from 'next/link';

const Social = () => {
    return (
        <div className="mt-6 flex items-center space-x-3">
            <Link
                className="block p-1.5 rounded-full text-white bg-[#171515] transition-opacity hover:opacity-75"
                href="https://github.com/BBBigCat"
                target="_blank"
                title="Github"
            >
                <IconBrandGithub size={20} />
            </Link>
            <Link
                className="block p-1.5 rounded-full text-white bg-[#1e80ff] transition-opacity hover:opacity-75"
                href="https://juejin.cn/user/2743980418143134/posts"
                target="_blank"
                title="juejin"
            >
                <IconBrandJuejin size={20} />
            </Link>
            <Link
                className="block p-1.5 rounded-full text-white bg-[#e86125] transition-colors hover:opacity-75"
                href="mailto:liuooonihaoa@163.com"
                title="邮箱"
            >
                <IconMail size={20} />
            </Link>
        </div>
    );
};

export default Social;
