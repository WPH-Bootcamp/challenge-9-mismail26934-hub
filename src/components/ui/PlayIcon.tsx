import playIcon from '@/assets/images/play.png';

export function PlayIcon() {
  return (
    <img
      src={playIcon}
      alt="Icon Play"
      aria-hidden
      width={28}
      height={28}
      className="h-7 w-7 shrink-0"
    />
  );
}
