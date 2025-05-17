export function formatRelativeTime(dateString: string | Date): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    if (diffInSeconds < 60) return "az önce";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} dakika önce`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} saat önce`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} gün önce`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} ay önce`;
  
    return `${Math.floor(diffInSeconds / 31536000)} yıl önce`;
  }
  