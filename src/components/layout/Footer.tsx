import { BrandLogo } from '@/components/layout/BrandLogo';

export function Footer() {
  return (
    <footer className="mt-auto w-full min-w-0 border-t border-[#181D27] bg-black py-8 md:py-10">
      <div className="container-page flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <BrandLogo />
        <p className="text-sm text-[#9CA3AF]">Copyright ©2025 Movie Explorer</p>
      </div>
    </footer>
  );
}
