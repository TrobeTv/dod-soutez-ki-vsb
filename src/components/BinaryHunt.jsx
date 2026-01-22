import React, { useState, useEffect, useRef } from 'react';
import { LABS_DATA } from '../config/labs';
import AccessGranted from './AccessGranted';
import { Turnstile } from '@marsidev/react-turnstile'



const TutorialOverlay = ({ onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="border border-primary/30 bg-background-dark p-6 max-w-sm w-full relative overflow-hidden rounded-xl shadow-[0_0_30px_rgba(19,200,236,0.1)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M20,4H4C2.89,4,2,4.89,2,6v12c0,1.11,0.89,2,2,2h16c1.11,0,2-0.89,2-2V6C22,4.89,21.11,4,20,4z M20,18H4V8h16V18z M4,6V6 h16v1.17L4,6z M7.5,14H6v-3h1.5v0.5h1V11h1v3.5L7.5,14z M11,14h-1.5v-3h1.5v0.5h1V11h-2v3.5H11V14z M14,14h-1.5v-3h1.5v0.5h1V11h-2 v3.5H14V14z" />
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM7.5 17l-1.41-1.41L8.67 13l-2.59-2.59L7.5 9l4 4-4 4z" />
                </svg>
                DNY_OTEVŘENÝCH_DVEŘÍ
            </h2>
            <div className="space-y-3 text-sm text-primary/80 font-mono leading-relaxed">
                <p>&gt; VÍTEJ NA INFORMATICE.</p>
                <p>&gt; <b>MISE:</b> NAJDI 7 BINÁRNÍCH SEKVENCÍ UKRYTÝCH V NAŠICH LABORATOŘÍCH VE 4. PATŘE.</p>
                <p>&gt; <b>AKCE:</b> VLOŽ 4 ČÍSLA BINÁRNÍ SEKVENCE, KTERÁ SE TI ZOBRAZÍ PO NAČTENÍ QR KÓDU.</p>
                <p>&gt; <b>UPOZORNĚNÍ:</b> PRO ZAŘAZENÍ DO SOUTĚŽE MUSÍŠ TAKÉ SLEDOVAT INSTAGRAM KATEDRY INFORMATIKY ki.vsb.cz</p>
                <p>&gt; <b>FINAL:</b> PO ODEMČENÍ VŠECH 7 LABORATOŘÍ SE TI ZOBRAZÍ KÓD, KTERÝ NAZEPOMEŇ VLOŽIT DO SOUTĚŽNÍHO DOTAZNÍKU.</p>
                <p>&gt; ODKAZ NA DOTAZNÍK NAJDEŠ POD FINÁLNÍM KÓDEM.</p>
                {/* <p>&gt; UPOZORNĚNÍ: MUSÍŠ SLEDOVAT INSTAGRAM KATEDRY INFORMATIKY ki.vsb.cz PRO TO ABY TVŮJ SOUTĚŽNÍ KÓD BYL PLATNÝ</p> */}
            </div>
            <button
                onClick={onClose}
                className="mt-6 w-full py-3 bg-primary/10 hover:bg-primary/20 border border-primary/50 text-primary font-bold tracking-widest uppercase transition-all hover:shadow-[0_0_15px_rgba(19,200,236,0.3)] rounded-lg text-xs"
            >
                POTVRDIT
            </button>
        </div>
    </div>
);

const BinaryHunt = () => {
    // Persistence Loading
    const loadState = () => {
        const savedLabs = localStorage.getItem('unlockedLabs');
        const savedTutorial = localStorage.getItem('tutorialSeen');
        return {
            unlockedLabs: savedLabs ? JSON.parse(savedLabs) : [],
            tutorialSeen: savedTutorial === 'true'
        };
    };

    const [state, setState] = useState(loadState);
    const [buffer, setBuffer] = useState('');
    const [uiState, setUiState] = useState('idle'); // idle, checking, success, error
    const [lastUnlocked, setLastUnlocked] = useState(null);
    const [showTutorial, setShowTutorial] = useState(!state.tutorialSeen);

    const [token, setToken] = useState(null);

    // Persistence Saving
    useEffect(() => {
        localStorage.setItem('unlockedLabs', JSON.stringify(state.unlockedLabs));
    }, [state.unlockedLabs]);

    useEffect(() => {
        if (state.tutorialSeen) {
            localStorage.setItem('tutorialSeen', 'true');
        }
    }, [state.tutorialSeen]);

    // Debugging Tool
    useEffect(() => {
        window.resetHack = () => {
            localStorage.removeItem('unlockedLabs');
            localStorage.removeItem('tutorialSeen');
            window.location.reload();
        };
        //console.log("%c DEBUG: Type 'resetHack()' to reset progress", "color: #13c8ec; font-weight: bold; background: #101f22; padding: 4px;");
    }, []);

    // Input Handling
    const handleInput = (bit) => {
        if (uiState !== 'idle' || buffer.length >= 4) return;
        setBuffer(prev => prev + bit);
    };

    const handleReset = () => {
        setBuffer('');
        setUiState('idle');
    };

    const handleTutorialClose = () => {
        setShowTutorial(false);
        setState(prev => ({ ...prev, tutorialSeen: true }));
    };

    // Validation Logic
    useEffect(() => {
        if (buffer.length === 4) {
            setUiState('checking');

            const timer = setTimeout(() => {
                const foundLab = LABS_DATA.find(lab => lab.code === buffer);

                if (foundLab) {
                    if (state.unlockedLabs.includes(foundLab.id)) {
                        // Already unlocked - treat as success/approved
                        setUiState('success');
                        setTimeout(() => {
                            setBuffer('');
                            setUiState('idle');
                        }, 1000);
                    } else {
                        // New Unlock
                        setState(prev => ({
                            ...prev,
                            unlockedLabs: [...prev.unlockedLabs, foundLab.id]
                        }));
                        setLastUnlocked(foundLab.id);
                        setUiState('success');
                        setTimeout(() => {
                            setBuffer('');
                            setUiState('idle');
                            setLastUnlocked(null);
                        }, 2000);
                    }
                } else {
                    // Invalid Code
                    setUiState('error');
                    setTimeout(() => {
                        setBuffer('');
                        setUiState('idle');
                    }, 1000);
                }
            }, 600); // Simulate processing delay

            return () => clearTimeout(timer);
        }
    }, [buffer, state.unlockedLabs]);

    const allUnlocked = state.unlockedLabs.length === LABS_DATA.length;

    if (allUnlocked) {
        return <AccessGranted />;
    }

    return (
        <div className="relative flex h-[100dvh] w-full flex-col max-w-md mx-auto border-x border-primary/10 overflow-hidden bg-background-dark">
            {/* Overlays */}
            <div className="fixed inset-0 scanlines z-40 pointer-events-none"></div>
            <div className="fixed inset-0 noise z-30 pointer-events-none"></div>

            {showTutorial && <TutorialOverlay onClose={handleTutorialClose} />}

            {/* Security Gate Overlay - Full Screen Turnstile */}
            {!token && (
                <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-background-dark/98 backdrop-blur-xl p-4 text-center">
                    <div className="max-w-md w-full border border-primary/30 p-8 rounded-2xl shadow-[0_0_50px_rgba(19,200,236,0.1)] relative overflow-hidden">
                        {/* Decorative Scanline */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse"></div>

                        <div className="mb-8 space-y-4">
                            <div className="flex justify-center mb-6">
                                <div className="p-4 rounded-full bg-primary/10 border border-primary/20 animate-pulse-slow">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 text-primary">
                                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            <h1 className="text-2xl font-bold text-white tracking-[0.2em] uppercase">Security Check</h1>
                            <p className="text-primary/60 text-sm font-mono tracking-tight">
                                &gt; UNIDENTIFIED_USER_DETECTED<br />
                                &gt; VERIFY_HUMAN_PRESENCE_TO_PROCEED
                            </p>
                        </div>

                        <div className="flex justify-center min-h-[65px]">
                            <Turnstile
                                siteKey={import.meta.env.VITE_CLOUDFLARE_SITE_KEY}
                                onSuccess={(token) => setToken(token)}
                                options={{
                                    theme: 'dark',
                                    size: 'normal',
                                }}
                            />
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <p className="text-[10px] text-white/20 uppercase tracking-widest font-mono">
                                SECURITY_PROTOCOL_V.9.4.1
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Bar */}
            <div className="flex items-center bg-background-dark p-4 pb-2 justify-between border-b border-primary/20 z-10 relative">
                <div className="text-primary flex size-10 shrink-0 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M20,4H4C2.89,4,2,4.89,2,6v12c0,1.11,0.89,2,2,2h16c1.11,0,2-0.89,2-2V6C22,4.89,21.11,4,20,4z M20,18H4V8h16V18z M4,6V6 h16v1.17L4,6z M7.5,14H6v-3h1.5v0.5h1V11h1v3.5L7.5,14z M11,14h-1.5v-3h1.5v0.5h1V11h-2v3.5H11V14z M14,14h-1.5v-3h1.5v0.5h1V11h-2 v3.5H14V14z" />
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM7.5 17l-1.41-1.41L8.67 13l-2.59-2.59L7.5 9l4 4-4 4z" />
                    </svg>
                </div>
                <h2 className="text-white text-xs font-bold leading-tight tracking-widest flex-1 px-3 uppercase">
                    KI_VŠB // SYS_PROTOCOL v23.1.24.1.
                </h2>
                <div className="flex w-10 items-center justify-end">
                    <div className="flex items-center gap-1">
                        <div className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#13c8ec]"></div>
                        <span className="text-[10px] text-primary font-bold tracking-tighter">LIVE</span>
                    </div>
                </div>
            </div>

            {/* Progress Tracker */}
            <div className="flex w-full flex-row items-center justify-center gap-3 py-4 bg-background-dark/50 z-10 relative">
                {LABS_DATA.map((lab, idx) => {
                    const isUnlocked = state.unlockedLabs.includes(lab.id);
                    return (
                        <div key={lab.id} className="flex flex-col items-center gap-1 group">
                            <div
                                className={`h-1.5 w-6 rounded-full transition-all duration-500 ${isUnlocked
                                    ? 'bg-primary shadow-[0_0_5px_#13c8ec]'
                                    : 'bg-white/5 border border-white/10'
                                    }`}
                            ></div>
                            <span
                                className={`text-[8px] transition-colors ${isUnlocked ? 'text-primary' : 'text-white/20'
                                    }`}
                            >
                                {String(idx + 1).padStart(2, '0')}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Meta Log */}
            <div className="px-4 py-2 border-y border-primary/10 bg-black/20 z-10 relative">
                <p className="text-primary/70 text-[10px] font-mono leading-none tracking-tight">
                    &gt; TARGET_NODE: {allUnlocked ? 'SYSTEM_UNLOCKED' : 'ENCRYPTION_LAYER'}<br />
                    &gt; STATUS: {uiState === 'checking' ? 'DECRYPTING...' : uiState === 'success' ? 'ACCESS_GRANTED' : uiState === 'error' ? 'ACCESS_DENIED' : 'WAITING_INPUT'}<br />
                    &gt; AUTH_REQUIRED: {token ? 'Authenticated' : 'Cloudflare Turnstile Pending...'}
                </p>
            </div>

            {/* Main Display */}
            <div className="flex-1 flex flex-col items-center justify-start px-6 pt-8 z-10 relative overflow-y-auto pb-64">
                {/* VFD Display */}
                <div
                    className={`w-full shrink-0 min-h-[200px] sm:min-h-[240px] vfd-display rounded-xl border p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 ${uiState === 'error' ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]' :
                        uiState === 'success' ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)] animate-pulse' :
                            'border-primary/30'
                        }`}
                >
                    <div className="absolute top-2 left-2 text-[10px] text-primary/20 font-mono uppercase">Buffer_v04</div>
                    <div className="absolute bottom-2 right-2 text-[10px] text-primary/20 font-mono uppercase">C-892-X</div>

                    <h1 className={`tracking-widest sm:tracking-[0.5em] text-4xl sm:text-[56px] font-bold leading-tight text-center glow-text flex items-center h-20 transition-colors ${uiState === 'error' ? 'text-red-500' :
                        uiState === 'success' ? 'text-green-500' :
                            'text-primary'
                        }`}>
                        {buffer.padEnd(4, '_').split('').map((char, i) => (
                            <span key={i} className={char === '_' ? 'text-primary/20' : ''}>{char}</span>
                        ))}
                        {buffer.length < 4 && uiState === 'idle' && (
                            <span className="w-6 h-8 sm:w-8 sm:h-12 bg-primary/80 ml-2 animate-blink hidden sm:block"></span>
                        )}
                    </h1>

                    <div className="mt-4 flex gap-8">
                        <div className="text-center">
                            <p className="text-[10px] text-primary/40 uppercase tracking-widest">State</p>
                            <p className={`text-xs font-bold ${uiState === 'error' ? 'text-red-500' :
                                uiState === 'success' ? 'text-green-500' :
                                    'text-primary'
                                }`}>
                                {uiState === 'success' ? 'APPROVED' : uiState.toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>



                {/* Unlocked Labs List */}
                <div className="grid grid-cols-2 gap-3 w-full mt-8">
                    {LABS_DATA.map((lab) => {
                        const isUnlocked = state.unlockedLabs.includes(lab.id);
                        const isJustUnlocked = lastUnlocked === lab.id;

                        return (
                            <div
                                key={lab.id}
                                className={`flex gap-3 rounded-lg border p-3 flex-row items-center transition-all duration-500 ${isJustUnlocked ? 'animate-pulse bg-primary/20 border-primary scale-105' :
                                    isUnlocked ? 'border-primary/30 bg-[#192f33]/40' :
                                        'border-white/5 bg-white/5 opacity-50 grayscale'
                                    }`}
                            >
                                <div
                                    className={isUnlocked ? 'text-primary' : 'text-white/20'}
                                >
                                    {isUnlocked ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-primary">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white/20">
                                            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <h2 className="text-white text-[10px] font-bold leading-tight truncate">{lab.name}</h2>
                                    <p className={isUnlocked ? 'text-primary text-[10px]' : 'text-white/20 text-[10px]'}>
                                        {isUnlocked ? '[X] VERIFIED' : '[-] LOCKED'}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Claim Reward Button */}
                {allUnlocked && (
                    <div className="mt-8 w-full animate-bounce">
                        <a
                            href="https://forms.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-background-dark font-bold text-lg rounded-xl shadow-[0_0_20px_#13c8ec] hover:scale-105 transition-transform"
                        >
                            <span className="material-symbols-outlined">emoji_events</span>
                            CLAIM REWARD
                        </a>
                    </div>
                )}
            </div>

            {/* Control Deck */}
            <div className="p-6 pb-10 bg-background-dark/95 backdrop-blur-md border-t border-primary/20 z-20 absolute bottom-0 w-full left-0">
                <div className="flex gap-4 h-24 mb-4">
                    <button
                        onClick={() => handleInput('0')}
                        disabled={uiState !== 'idle' || allUnlocked || !token}
                        className="flex-1 rounded-xl bg-background-dark border-2 border-primary/40 shadow-[0_4px_0_0_#0a6b7e] active:shadow-none active:translate-y-1 transition-all flex flex-col items-center justify-center group disabled:opacity-50 disabled:active:translate-y-0 disabled:shadow-[0_4px_0_0_#0a6b7e]"
                    >
                        <span className="text-4xl font-bold text-primary glow-text group-active:scale-95">0</span>
                        <span className="text-[10px] text-primary/50 mt-1 uppercase tracking-tighter">Null</span>
                    </button>
                    <button
                        onClick={() => handleInput('1')}
                        disabled={uiState !== 'idle' || allUnlocked || !token}
                        className="flex-1 rounded-xl bg-background-dark border-2 border-primary/40 shadow-[0_4px_0_0_#0a6b7e] active:shadow-none active:translate-y-1 transition-all flex flex-col items-center justify-center group disabled:opacity-50 disabled:active:translate-y-0 disabled:shadow-[0_4px_0_0_#0a6b7e]"
                    >
                        <span className="text-4xl font-bold text-primary glow-text group-active:scale-95">1</span>
                        <span className="text-[10px] text-primary/50 mt-1 uppercase tracking-tighter">Pulse</span>
                    </button>
                </div>

                <div className="flex justify-between items-center px-2">
                    <button className="text-white/40 text-[10px] uppercase font-bold tracking-widest hover:text-red-400 transition-colors flex items-center gap-1 opacity-50 cursor-not-allowed">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                        </svg>
                        ABORT
                    </button>
                    <button
                        onClick={handleReset}
                        className="text-primary text-[10px] uppercase font-bold tracking-widest flex items-center gap-1 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                            <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                        </svg>
                        RESET
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BinaryHunt;
