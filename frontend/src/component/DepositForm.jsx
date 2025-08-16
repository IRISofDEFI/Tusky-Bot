import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const DepositForm = () => {
    const { publicKey } = useWallet();
    const [amount, setAmount] = useState('');
    const [tokenMint, setTokenMint] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Calculate allocations
    const depositAmount = parseFloat(amount) || 0;
    const holderAllocation = depositAmount * 0.1; // 10%
    const founderAllocation = depositAmount * 0.1; // 10%
    const volumeAllocation = depositAmount * 0.8; // 80%

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!publicKey || !amount || !tokenMint) return;

        setIsLoading(true);
        try {
            // TODO: Implement actual deposit logic with backend API
            console.log('Deposit submitted:', {
                userWallet: publicKey.toString(),
                amount: parseFloat(amount),
                tokenMint
            });

            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            alert('Deposit submitted successfully! Check status for progress.');
            setAmount('');
            setTokenMint('');
        } catch (error) {
            console.error('Deposit failed:', error);
            alert('Deposit failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Token Mint Input */}
                <div>
                    <label htmlFor="tokenMint" className="block text-sm font-medium text-slate-300 mb-2">
                        Token Mint Address
                    </label>
                    <input
                        type="text"
                        id="tokenMint"
                        value={tokenMint}
                        onChange={(e) => setTokenMint(e.target.value)}
                        placeholder="Enter SPL token mint address"
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-afriverse-500 focus:border-transparent"
                        required
                    />
                </div>

                {/* Amount Input */}
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-slate-300 mb-2">
                        Deposit Amount (SOL)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.0"
                        step="0.1"
                        min="0.1"
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-afriverse-500 focus:border-transparent"
                        required
                    />
                </div>

                {/* Allocation Preview */}
                {depositAmount > 0 && (
                    <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                        <h4 className="text-sm font-medium text-slate-300 mb-3">Allocation Preview</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Holder Rewards (10%):</span>
                                <span className="text-afriverse-400 font-medium">{holderAllocation.toFixed(2)} SOL</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Founder Wallet (10%):</span>
                                <span className="text-afriverse-400 font-medium">{founderAllocation.toFixed(2)} SOL</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Volume Generation (80%):</span>
                                <span className="text-afriverse-400 font-medium">{volumeAllocation.toFixed(2)} SOL</span>
                            </div>
                            <div className="border-t border-slate-600 pt-2 mt-2">
                                <div className="flex justify-between font-medium">
                                    <span>Total:</span>
                                    <span>{depositAmount.toFixed(2)} SOL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!publicKey || !amount || !tokenMint || isLoading}
                    className="w-full bg-afriverse-600 hover:bg-afriverse-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        'Create Deposit'
                    )}
                </button>
            </form>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-slate-700 rounded-lg border border-slate-600">
                <h4 className="text-sm font-medium text-slate-300 mb-2">ℹ️ How it works</h4>
                <ul className="text-xs text-slate-400 space-y-1">
                    <li>• Holder rewards are distributed over 12 hours to top 10 holders</li>
                    <li>• Founder allocation includes rug pull detection protection</li>
                    <li>• Volume generation uses 80% of your deposit for trading</li>
                    <li>• All transactions are executed on Solana devnet</li>
                </ul>
            </div>
        </div>
    );
};

export default DepositForm;
