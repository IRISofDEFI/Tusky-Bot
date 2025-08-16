import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const StatusDisplay = () => {
    const { publicKey } = useWallet();
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock status data for demonstration
    useEffect(() => {
        if (publicKey) {
            // Simulate API call to fetch status
            const fetchStatus = async () => {
                setLoading(true);
                try {
                    // TODO: Replace with actual API call
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Mock data
                    setStatus({
                        depositAmount: 2.5,
                        tokenMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                        timestamp: new Date().toISOString(),
                        isActive: true,
                        holderAllocation: 0.25,
                        founderAllocation: 0.25,
                        volumeAllocation: 2.0,
                        distributionProgress: {
                            completed: 3,
                            total: 12,
                            nextDistribution: new Date(Date.now() + 3600000).toISOString() // 1 hour from now
                        },
                        volumeCheck: {
                            lastCheck: new Date().toISOString(),
                            isActive: true,
                            threshold: 1000
                        }
                    });
                } catch (error) {
                    console.error('Failed to fetch status:', error);
                    setStatus(null);
                } finally {
                    setLoading(false);
                }
            };

            fetchStatus();
        }
    }, [publicKey]);

    if (!publicKey) {
        return (
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <p className="text-slate-400 text-center">Connect your wallet to view status</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-center">
                    <svg className="animate-spin h-8 w-8 text-afriverse-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="ml-3 text-slate-300">Loading status...</span>
                </div>
            </div>
        );
    }

    if (!status) {
        return (
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-slate-300 mb-2">No Active Deposits</h3>
                    <p className="text-slate-400">Create a deposit to start volume generation</p>
                </div>
            </div>
        );
    }

    const progressPercentage = (status.distributionProgress.completed / status.distributionProgress.total) * 100;

    return (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-6">
            {/* Deposit Info */}
            <div>
                <h3 className="text-lg font-medium text-slate-300 mb-4">Active Deposit</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-slate-400">Amount:</span>
                        <span className="text-afriverse-400 font-medium">{status.depositAmount} SOL</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Token:</span>
                        <span className="text-slate-300 text-sm font-mono">
                            {status.tokenMint.slice(0, 8)}...{status.tokenMint.slice(-8)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.isActive
                                ? 'bg-green-900 text-green-300'
                                : 'bg-red-900 text-red-300'
                            }`}>
                            {status.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Distribution Progress */}
            <div>
                <h3 className="text-lg font-medium text-slate-300 mb-4">Holder Distribution Progress</h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Progress:</span>
                        <span className="text-slate-300">
                            {status.distributionProgress.completed} / {status.distributionProgress.total} distributions
                        </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                            className="bg-afriverse-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <div className="text-xs text-slate-400">
                        Next distribution: {new Date(status.distributionProgress.nextDistribution).toLocaleTimeString()}
                    </div>
                </div>
            </div>

            {/* Volume Check Status */}
            <div>
                <h3 className="text-lg font-medium text-slate-300 mb-4">Volume Generation</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.volumeCheck.isActive
                                ? 'bg-green-900 text-green-300'
                                : 'bg-yellow-900 text-yellow-300'
                            }`}>
                            {status.volumeCheck.isActive ? 'Active' : 'Monitoring'}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Last Check:</span>
                        <span className="text-slate-300">
                            {new Date(status.volumeCheck.lastCheck).toLocaleTimeString()}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Allocation:</span>
                        <span className="text-afriverse-400">{status.volumeAllocation} SOL</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-700">
                <div className="grid grid-cols-2 gap-3">
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md text-sm transition-colors">
                        Refresh Status
                    </button>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors">
                        Cancel Deposit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusDisplay;
