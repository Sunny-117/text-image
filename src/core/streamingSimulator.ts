import { useState, useRef, useEffect } from 'react';
import type { StreamingSimulatorConfig } from '../types';

/**
 * 流式数据模拟钩子
 * @param config 流式模拟配置
 * @returns 当前内容、是否在传输中、开始传输函数
 */
export const useStreamingSimulator = (config: StreamingSimulatorConfig) => {
    const [content, setContent] = useState(config.initialContent || '');
    const [isStreaming, setIsStreaming] = useState(false);
    const currentIndexRef = useRef(0);
    const timerRef = useRef<number | null>(null);

    const startStreaming = () => {
        if (isStreaming) return;

        setIsStreaming(true);
        currentIndexRef.current = 0;
        setContent(config.initialContent || '');

        timerRef.current = setInterval(() => {
            if (currentIndexRef.current < config.chunks.length) {
                setContent(prev => prev + config.chunks[currentIndexRef.current]);
                currentIndexRef.current++;
            } else {
                stopStreaming();
            }
        }, config.interval || 100);
    };

    const stopStreaming = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setIsStreaming(false);
    };

    // 组件卸载时清除定时器
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    return {
        content,
        isStreaming,
        startStreaming,
        stopStreaming
    };
};