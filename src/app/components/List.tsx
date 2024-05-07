import dayjs from 'dayjs';
import Link from 'next/link';

interface Data {
    slug: string;
    title: string;
    url: string;
    date: string;
}

interface ListProps {
    data: Data[];
    className?: string;
}

const List: React.FC<ListProps> = props => {
    const { data, className } = props;

    return (
        <ul className={className}>
            {data.map(item => (
                <li key={item.slug} className="px-3 py-2 mt-1 rounded-md transition-colors hover:bg-gray-100">
                    <Link href={item.url} className="flex items-center justify-between space-x-2">
                        <span className="flex-grow text-gray-900 line-clamp-1">{item.title}</span>
                        <span className="flex-shrink-0 text-sm text-gray-400 font-mono">
                            {dayjs(item.date).format('YYYY-MM-DD')}
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default List;
