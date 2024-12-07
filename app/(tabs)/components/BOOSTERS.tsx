import React, { useState, useCallback } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, withSequence, withDelay, withRepeat, Easing, runOnJS } from 'react-native-reanimated';
import { Image, Text, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { BoosterPack, PokemonCardProps } from '../types';
import { CardsRevealAnimation } from '../components/CardsRevealAnimation';
import { styles } from '../style/style';

// Images des boosters
export const BOOSTERS = {
  IRON_CROWN: require('../assets/booster/Pokemon_TCG_Scarlet_Violet—Temporal_Forces_Booster_Wrap_Iron_Crown.png'),
  IRON_LEAVES: require('../assets/booster/Pokemon_TCG_Scarlet_Violet—Temporal_Forces_Booster_Wrap_Iron_Leaves.png'),
  RAGING_BOLT: require('../assets/booster/Pokemon_TCG_Scarlet_Violet—Temporal_Forces_Booster_Wrap_Raging_Bolt.png'),
} as const;

// Composant d'animation d'ouverture de booster
export const BoosterOpeningAnimation: React.FC<{
  booster: BoosterPack;
  onClose: () => void;
}> = ({ booster, onClose }) => {
  const [step, setStep] = useState<'initial' | 'flip' | 'cards'>('initial');
  const scale = useSharedValue(1);
  const rotateY = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const handlePress = useCallback(() => {
    if (step === 'initial') {
      // Animation de flip
      scale.value = withSequence(
        withSpring(1.2),
        withSpring(1)
      );
      rotateY.value = withSequence(
        withTiming(180, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease)
        }),
        withDelay(500, withTiming(360, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease)
        }))
      );
      translateY.value = withSequence(
        withSpring(-50),
        withSpring(0)
      );
      opacity.value = withDelay(1500, withTiming(0, {
        duration: 500
      }, () => {
        runOnJS(setStep)('cards');
      }));
      setStep('flip');
    }
  }, [step]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateY: `${rotateY.value}deg` },
      { translateY: translateY.value }
    ],
    opacity: opacity.value,
  }));

  if (step === 'cards') {
    return <CardsRevealAnimation cards={booster.cards} onClose={onClose} />;
  }

  return (
    <BlurView intensity={100} style={styles.modalContainer}>
      <TouchableOpacity onPress={handlePress} >
        <Animated.View style={[styles.boosterAnimationContainer, animatedStyle]}>
          <Image
            source={booster.boosterImage}
            style={styles.boosterAnimationImage}
            resizeMode="contain"
          />
        </Animated.View>
        {step === 'initial' && (
          <Text style={styles.tapToOpenText}>Tap to Open!</Text>
        )}
      </TouchableOpacity>
    </BlurView>
  );
};

// Composant Carte Pokémon
export const PokemonCard: React.FC<PokemonCardProps> = ({ boosterImage, onPress, isAnimated = false }) => {
  const scale = useSharedValue(1);

  const handlePress = useCallback(() => {
    if (isAnimated) {
      scale.value = withSequence(
        withSpring(1.1),
        withSpring(1)
      );
    }
    onPress?.();
  }, [isAnimated, onPress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Animated.View style={[styles.cardBase, animatedStyle]}>
        <Image
          source={boosterImage}
          style={styles.boosterImage}
          resizeMode="cover"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};