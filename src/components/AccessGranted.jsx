import React from 'react';

const AccessGranted = () => {
    // Verification Code Logic
    const [verificationCode, setVerificationCode] = React.useState('');
    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
        const savedCode = localStorage.getItem('binaryHunt_verificationCode');
        if (savedCode) {
            setVerificationCode(savedCode);
        } else {
            // Generate Code: xx9x
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const char1 = chars.charAt(Math.floor(Math.random() * chars.length));
            const char2 = chars.charAt(Math.floor(Math.random() * chars.length));
            const char4 = chars.charAt(Math.floor(Math.random() * chars.length));
            const newCode = `${char1}${char2}9${char4}`;

            localStorage.setItem('binaryHunt_verificationCode', newCode);
            setVerificationCode(newCode);
        }
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(verificationCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative flex flex-col min-h-[100dvh] w-full max-w-md mx-auto border-x border-primary/10 bg-background-dark/95 shadow-2xl overflow-hidden">
            {/* Overlays */}
            <div className="fixed inset-0 scanlines z-40 pointer-events-none"></div>
            <div className="fixed inset-0 noise z-30 pointer-events-none"></div>
            <div className="fixed inset-0 pointer-events-none matrix-bg z-0 opacity-20"></div>

            {/* TopAppBar */}
            <header className="flex items-center bg-[#111f22] p-4 pb-2 justify-between border-b border-primary/20 z-10 relative">
                <div className="text-primary flex size-12 shrink-0 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                </div>
                <h2 className="text-primary text-lg font-bold leading-tight tracking-[0.2em] flex-1 text-center uppercase">Access Granted</h2>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-primary gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                            <path d="M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2h2v-2h-2v-2h2v-2h-2zm-4 6H7V7h10v10z" />
                        </svg>
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col p-4 space-y-6 z-10 relative overflow-y-auto">
                {/* HeadlineText */}
                <div className="pt-8">
                    <h2 className="text-white tracking-widest text-2xl font-bold leading-tight px-4 text-center uppercase border-y border-primary/20 py-6 bg-primary/5">
                        System Unlocked<br />
                        <span className="text-primary text-sm tracking-normal font-medium opacity-80 mt-2 block">// Authentication Complete</span>
                    </h2>
                </div>



                {/* Stats & Completion Matrix */}
                <div className="flex flex-col gap-4">
                    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#234248]/40 border border-primary/30">
                        <div className="flex justify-center items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-primary">
                                <path fillRule="evenodd" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" clipRule="evenodd" />
                            </svg>
                            <p className="text-primary/70 text-xs font-bold leading-normal tracking-tighter uppercase text-center">Decryption Status</p>

                        </div>
                        <p className="text-white tracking-light text-4xl font-bold leading-tight text-center">100%</p>
                        <div className="flex items-center justify-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-[#0bda54]">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg>
                            <p className="text-[#0bda54] text-xs font-bold leading-normal uppercase">All Labs Verified</p>
                        </div>
                    </div>

                    {/* PageIndicators as Lab Completion Grid */}
                    <div className="flex flex-col items-center gap-3 py-4 bg-primary/5 rounded-lg border border-primary/10">
                        <p className="text-primary/60 text-[10px] uppercase tracking-widest font-bold">Lab Integrity Checks (7/7)</p>
                        <div className="flex w-full flex-row items-center justify-center gap-4">
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className="h-3 w-3 rounded-sm bg-primary shadow-[0_0_8px_#13c8ec]"></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Verification Token Section */}
                <div className="flex flex-col gap-2 p-6 bg-[#1a2e33]/50 rounded-lg border border-primary/40 shadow-[0_0_15px_rgba(19,200,236,0.1)] text-center animate-pulse-slow">
                    <p className="text-primary/70 text-m font-bold uppercase tracking-widest">tvůj unikátní kód</p>
                    <div
                        onClick={handleCopy}
                        className="flex items-center justify-center gap-3 cursor-pointer group hover:bg-white/5 p-2 rounded transition-colors relative"
                    >
                        <span className={`text-4xl font-bold tracking-[0.2em] font-mono transition-all ${copied ? 'text-green-400' : 'text-white'}`}>
                            {verificationCode}
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 text-primary">
                            {copied ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-green-400">
                                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" className="size-8">
                                    <path d="M288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448L480 448C515.3 448 544 419.3 544 384L544 183.4C544 166 536.9 149.3 524.3 137.2L466.6 81.8C454.7 70.4 438.8 64 422.3 64L288 64zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L352 496L352 512L160 512L160 256L176 256L176 192L160 192z" />
                                </svg>
                            )}
                        </div>
                    </div>
                    <p className="text-primary/40 text-[13px] uppercase tracking-wider">
                        {copied ? 'COPIED TO CLIPBOARD' : 'CLICK TO COPY THIS CODE'}
                    </p>
                </div>

                {/* Uplink Button Section */}
                <div className="flex-1 flex flex-col justify-end pb-8">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-primary rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLScXQY4cYNmVWDFaF8NU2mPvwlodx_HZigIwT-237x3QYmCxlA/viewform" // Placeholder, user said "google form addres" but didn't give the URL. Assuming they want me to use the placeholder or if I missed it.
                            // Checking previous messages... user said "lead to the google form addres". 
                            // In BinaryHunt.jsx it was "https://forms.google.com". I will stick with that.
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-full flex items-center justify-center gap-3 bg-primary text-background-dark py-5 px-6 rounded-lg font-bold text-lg tracking-widest uppercase glow-button active:scale-[0.98] transition-all text-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z" />
                            </svg>
                            ODESLAT ODPOVĚĎ
                        </a>
                        <p className="text-center text-primary/40 text-[10px] mt-4 tracking-widest uppercase">(Submit Competition Data)</p>
                    </div>
                </div>
            </main>

            {/* Technical Footer Decoration */}
            <footer className="p-4 flex justify-between items-center opacity-30 pointer-events-none border-t border-primary/10 z-10 relative bg-[#111f22]">
                <div className="text-[9px] text-primary font-mono">
                    LATENCY: 12ms<br />
                    IP: 192.168.1.254
                </div>
                <div className="text-[9px] text-primary font-mono text-right">
                    U_UID: 8F-E2-A1-00<br />
                    LOC: UNIV_CORE_SERVER
                </div>
            </footer>
        </div>
    );
};

export default AccessGranted;
