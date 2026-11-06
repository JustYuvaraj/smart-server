import type { Metadata,Viewport } from 'next';
import './theme.css';
export const metadata:Metadata={title:'SmartServe — Your home, taken care of',description:'Book a home service, agree on the price, verify arrival, and keep every service record together.',manifest:'/manifest.webmanifest',icons:{icon:'/icon.svg',apple:'/icon-192.png'},appleWebApp:{capable:true,statusBarStyle:'default',title:'SmartServe'}};
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#173d30'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
