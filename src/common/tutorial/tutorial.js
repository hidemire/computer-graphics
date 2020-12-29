import React, { useEffect, useState } from 'react';
import Joyride, { STATUS } from 'react-joyride';

import Emitter from 'core/events';
import { EVENTS } from 'core/constants';

function Tutorial({ steps, name }) {
  const [run, setRun] = useState(false);

  const handleJoyrideCallback = ({ status }) => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
    }
  };

  const startTutorial = () => {
    setRun(true);
  };

  useEffect(() => {
    const event = `${name}:${EVENTS.START_TUTORIAL}`;
    Emitter.on(event, startTutorial);
    return () => Emitter.off(event, startTutorial);
  });

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      locale={
        {
          back: 'Назад',
          close: 'Завершити',
          last: 'Завершити',
          next: 'Далі',
          skip: 'Пропустити',
        }
      }
      run={run}
      steps={steps}
      showProgress
      showSkipButton
      styles={{
        options: {
          zIndex: 10000,
          textColor: 'inherit',
        },
      }}
    />
  );
}

export default Tutorial;
