import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { View } from 'react-native';

export const shareQuoteAsImage = async (viewRef: React.RefObject<View | null>) => {
    try {
        if (!viewRef.current) return;

        const uri = await captureRef(viewRef, {
            format: 'png',
            quality: 1,
            result: 'tmpfile',
        });

        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(uri, {
                mimeType: 'image/png',
                dialogTitle: 'Share this quote',
            });
        }
    } catch (error) {
        console.error('Failed to share quote:', error);
    }
};
