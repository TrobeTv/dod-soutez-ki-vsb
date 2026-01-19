import React from 'react';
import QRCode from 'react-qr-code';
import { LABS_DATA } from '../config/labs';

const QRGenerator = () => {
    // Determine base URL - in production this might need to be hardcoded if checking locally
    // but for this app it should work relative to where it is hosted.
    // If you need a specific domain, replace window.location.origin
    const baseUrl = window.location.origin;

    return (
        <div className="min-h-screen bg-white text-black p-8 font-mono print:p-0">
            <div className="mb-8 print:hidden">
                <h1 className="text-3xl font-bold mb-4">QR Code Generator</h1>
                <p className="mb-4">Print this page (Ctrl+P) to get physical cards for the game.</p>
                <div className="p-4 bg-yellow-100 border border-yellow-300 rounded mb-4">
                    <strong>Base URL:</strong> {baseUrl} <br />
                    <em>Make sure this is accessible to players' phones! (e.g. use local IP or deploy)</em>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 print:block print:gap-0">
                {LABS_DATA.map((lab) => (
                    <div key={lab.id} className="border-4 border-black p-8 flex flex-col items-center text-center page-break-inside-avoid print:mb-8 print:border-2">
                        <h2 className="text-2xl font-bold mb-2 uppercase">{lab.name}</h2>
                        <p className="text-sm mb-6 opacity-70">SCAN TO REVEAL SECURITY CODE</p>

                        <div className="bg-white p-4 border-2 border-black mb-6">
                            <QRCode
                                value={`${baseUrl}/reveal/${lab.id}`}
                                size={200}
                                level="H"
                            />
                        </div>

                        <div className="text-xs font-mono border-t border-black pt-4 w-full">
                            ID: {lab.id} // SYS_V3.6
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                @media print {
                    @page { margin: 1cm; }
                    .print\\:hidden { display: none !important; }
                    .print\\:block { display: block !important; }
                    .print\\:mb-8 { margin-bottom: 2rem; }
                    .print\\:border-2 { border-width: 2px; }
                    .page-break-inside-avoid { break-inside: avoid; }
                }
            `}</style>
        </div>
    );
};

export default QRGenerator;
