import Link from "next/link";

export default function Component() {
  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl font-bold">404 - Страница не найдена</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Страница, которую вы ищете, не существует.
      </p>
      <Link
        href="/"
        className="mt-4 px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
