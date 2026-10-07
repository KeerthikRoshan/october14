import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MobileFrame } from './components/common/MobileFrame';
import { AudioToggle } from './components/common/AudioToggle';
import { StoryProgress } from './components/common/StoryProgress';

// The 24 Experiences + Final Screen for Mine Mathi
import { Exp01LockedGift } from './components/experiences/Exp01LockedGift';
import { Exp02OneQuestion } from './components/experiences/Exp02OneQuestion';
import { Exp03Oct14 } from './components/experiences/Exp03Oct14';
import { Exp04Oct17 } from './components/experiences/Exp04Oct17';
import { Exp05Nov02 } from './components/experiences/Exp05Nov02';
import { Exp06ChaosEra } from './components/experiences/Exp06ChaosEra';
import { Exp07WeNeverLeft } from './components/experiences/Exp07WeNeverLeft';
import { Exp08June10 } from './components/experiences/Exp08June10';
import { Exp09Second14 } from './components/experiences/Exp09Second14';
import { Exp10HerThroughMyEyes } from './components/experiences/Exp10HerThroughMyEyes';
import { Exp11ScratchMemory } from './components/experiences/Exp11ScratchMemory';
import { Exp12TheLittleThings } from './components/experiences/Exp12TheLittleThings';
import { Exp13OurUniverse } from './components/experiences/Exp13OurUniverse';
import { Exp14OurSong } from './components/experiences/Exp14OurSong';
import { Exp15SmallGame } from './components/experiences/Exp15SmallGame';
import { Exp16AiPhotos } from './components/experiences/Exp16AiPhotos';
import { Exp17GiftBox } from './components/experiences/Exp17GiftBox';
import { Exp18OpenWhen } from './components/experiences/Exp18OpenWhen';
import { Exp19PacingShift } from './components/experiences/Exp19PacingShift';
import { Exp20RoshanLetter } from './components/experiences/Exp20RoshanLetter';
import { Exp21DontTapThis } from './components/experiences/Exp21DontTapThis';
import { Exp22FutureCameraRoll } from './components/experiences/Exp22FutureCameraRoll';
import { Exp23BirthdayMoment } from './components/experiences/Exp23BirthdayMoment';
import { Exp24FinalBirthdayReveal } from './components/experiences/Exp24FinalBirthdayReveal';
import { ExpFinalScreen } from './components/experiences/ExpFinalScreen';

const TOTAL_STEPS = 25;

export function App() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const nextStep = () => {
    setCurrentStep(prev => Math.min(TOTAL_STEPS - 1, prev + 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const restartStory = () => {
    setCurrentStep(0);
  };

  const renderCurrentExperience = () => {
    switch (currentStep) {
      case 0:
        return <Exp01LockedGift onComplete={nextStep} />;
      case 1:
        return <Exp02OneQuestion onComplete={nextStep} />;
      case 2:
        return <Exp03Oct14 onComplete={nextStep} />;
      case 3:
        return <Exp04Oct17 onComplete={nextStep} />;
      case 4:
        return <Exp05Nov02 onComplete={nextStep} />;
      case 5:
        return <Exp06ChaosEra onComplete={nextStep} />;
      case 6:
        return <Exp07WeNeverLeft onComplete={nextStep} />;
      case 7:
        return <Exp08June10 onComplete={nextStep} />;
      case 8:
        return <Exp09Second14 onComplete={nextStep} />;
      case 9:
        return <Exp10HerThroughMyEyes onComplete={nextStep} />;
      case 10:
        return <Exp11ScratchMemory onComplete={nextStep} />;
      case 11:
        return <Exp12TheLittleThings onComplete={nextStep} />;
      case 12:
        return <Exp13OurUniverse onComplete={nextStep} />;
      case 13:
        return <Exp14OurSong onComplete={nextStep} />;
      case 14:
        return <Exp15SmallGame onComplete={nextStep} />;
      case 15:
        return <Exp16AiPhotos onComplete={nextStep} />;
      case 16:
        return <Exp17GiftBox onComplete={nextStep} />;
      case 17:
        return <Exp18OpenWhen onComplete={nextStep} />;
      case 18:
        return <Exp19PacingShift onComplete={nextStep} />;
      case 19:
        return <Exp20RoshanLetter onComplete={nextStep} />;
      case 20:
        return <Exp21DontTapThis onComplete={nextStep} />;
      case 21:
        return <Exp22FutureCameraRoll onComplete={nextStep} />;
      case 22:
        return <Exp23BirthdayMoment onComplete={nextStep} />;
      case 23:
        return <Exp24FinalBirthdayReveal onComplete={nextStep} />;
      case 24:
        return <ExpFinalScreen onRestart={restartStory} />;
      default:
        return <Exp01LockedGift onComplete={nextStep} />;
    }
  };

  return (
    <MobileFrame>
      {/* Audio Toggle in top bar (visible after lock screen) */}
      {currentStep > 0 && <AudioToggle />}

      {/* Main Experience View with Smooth Page Transition */}
      <div className="relative w-full h-full overflow-hidden flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="w-full h-full flex flex-col justify-between"
          >
            {renderCurrentExperience()}
          </motion.div>
        </AnimatePresence>

        {/* Minimal Progress Indicator */}
        <StoryProgress
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          onNext={nextStep}
          onPrev={prevStep}
          showNavPills={currentStep > 0 && currentStep < 24}
        />
      </div>
    </MobileFrame>
  );
}

export default App;
