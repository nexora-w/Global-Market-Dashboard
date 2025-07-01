export const Skeleton = ({ height = "120px" }: { height?: string }) => (
  <div
    className="w-full bg-gradient-to-r from-gray-700/30 via-gray-500/20 to-gray-700/30 animate-pulse rounded-xl"
    style={{ height }}
  />
);
