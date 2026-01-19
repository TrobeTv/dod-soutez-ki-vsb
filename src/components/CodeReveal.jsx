import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LABS_DATA } from '../config/labs';

const CodeReveal = () => {
    const { id } = useParams();
    const [lab, setLab] = useState(null);

    useEffect(() => {
        const foundLab = LABS_DATA.find(l => l.id === id);
        setLab(foundLab);
    }, [id]);

    if (!lab) {
        return (
            <div className="min-h-screen bg-background-dark text-primary flex items-center justify-center p-4">
                <div className="text-center animate-pulse">
                    <h1 className="text-2xl font-bold mb-2">ERROR 404</h1>
                    <p className="font-mono text-sm opacity-70">TARGET_NODE_NOT_FOUND</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-dark flex flex-col relative overflow-hidden font-mono">
            {/* Background Effects */}
            <div className="fixed inset-0 scanlines z-10 pointer-events-none opacity-50"></div>
            <div className="fixed inset-0 noise z-20 pointer-events-none opacity-50"></div>

            {/* Header */}
            <div className="relative z-30 p-6 border-b border-primary/20 bg-background-dark/90">
                <h2 className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase mb-1">
                    System Protocol v3.6
                </h2>
                <div className="flex items-center gap-2 text-primary">
                    <div className="size-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#13c8ec]"></div>
                    <span className="text-sm font-bold tracking-widest">SECURE_CONNECTION_ESTABLISHED</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 relative z-30 flex flex-col items-center justify-center p-6 text-center">

                <div className="mb-8 relative group">
                    <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse group-hover:bg-primary/30 transition-all"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative size-16 text-primary drop-shadow-[0_0_15px_rgba(19,200,236,0.8)]">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                    </svg>
                </div>

                <h1 className="text-white text-lg font-bold tracking-widest uppercase mb-2">
                    Subject Identified
                </h1>
                <h2 className="text-primary text-xl font-bold tracking-tighter mb-12 shadow-primary/20 drop-shadow-sm">
                    {lab.name}
                </h2>

                <div className="relative w-full max-w-sm">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary"></div>

                    <div className="bg-primary/5 border border-primary/20 p-8 rounded backdrop-blur-sm">
                        <p className="text-primary/50 text-[10px] uppercase tracking-[0.3em] mb-4">Decrypted Sequence</p>
                        <div className="text-6xl font-bold text-white tracking-[0.2em] glitch-text relative hover:scale-105 transition-transform cursor-default" data-text={lab.code}>
                            {lab.code.split('').map((bit, i) => (
                                <span key={i} className={bit === '1' ? 'text-primary drop-shadow-[0_0_10px_rgba(19,200,236,0.8)]' : 'text-white/80'}>
                                    {bit}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-white/30 text-xs max-w-xs leading-relaxed">
                    &gt; INPUT THIS SEQUENCE INTO THE MAIN TERMINAL TO BYPASS SECURITY LAYER {lab.id.split('_')[1]}.
                </p>
            </div>

            {/* Footer Action */}
            <div className="relative z-30 p-6 bg-background-dark/90 border-t border-primary/20">
                <Link to="/" className="flex items-center justify-center h-14 w-full bg-primary/10 hover:bg-primary/20 border border-primary/50 text-primary font-bold tracking-[0.2em] uppercase rounded-lg transition-all hover:shadow-[0_0_20px_rgba(19,200,236,0.2)] group">
                    <span className="mr-2 group-hover:-translate-x-1 transition-transform">&lt;</span>
                    Return to Terminal
                </Link>
            </div>
        </div>
    );
};

export default CodeReveal;
