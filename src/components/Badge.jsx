export default function Badge({ text, isOkay }) {
  return (
    <span
      className={
        isOkay
          ? "inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-lime-200 text-gray-800 dark:bg-white/10 dark:text-white"
          : "inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500"
      }
    >
      {text}
    </span>
  );
}
