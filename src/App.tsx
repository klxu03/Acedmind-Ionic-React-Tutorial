import React, { useRef, useState } from "react";
// import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonAlert
} from "@ionic/react";

// Here are all the custom component imports
import BmiControls from "./components/BmiControls";
import BmiResults from "./components/BmiResult";
import InputControl from "./components/InputControl";
import Header from "./components/Header";

// import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const weightInputRef = useRef<HTMLIonInputElement>(null); // Here you are telling type script that this reference is definitely going to be an HTML Ionic Input
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const [calculatedBMI, setBMI] = useState<number>(); // Use general "number", int is not recognized
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<"mkg" | "ftlbs">("mkg"); //Here, in the useState, not just saying a string, but specifically one of thsoe 2 values

  const calculateBMI = () => {
    // Add a + in front to turn a string into an int
    const enteredWeight = weightInputRef.current?.value;
    // .current? is a terenary to check for null values
    // same as weightInputRef.current ? weightInputRef.current.value : null;
    const enteredHeight = heightInputRef.current!.value!;
    // use exclamation mark to tell typescript that this value is never null at tiem of accessing the data

    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredHeight <= 0 ||
      +enteredWeight <= 0
    ) {
      //Not an empty string or null
      setError("Please enter a valid (non-negative) input numer.");

      return;
    }

    /* If the calculated units are in ft lbs, then convert it from ft/lbs into m/kg */
    const weightConversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
    const heightConversionFactor = calcUnits === 'ftlbs' ? 3.28 : 1;

    const weight = +enteredWeight/weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;

    const bmi = weight / Math.pow(height, 2);

    setBMI(bmi);
  };

  const resetInputs = () => {
    // Emptying the inner values
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  };

  const clearError = () => {
    setError("");
  };

  const selectCalcUnitHandler = (selectedValue: "mkg" | "ftlbs") => {
    setCalcUnits(selectedValue);
  };

  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!error} // Converts this into a true boolean. Not(Not(___)) this will be true if this is not an empty string and undefined
        message={error}
        buttons={[
          {
            text: "Okay",
            handler: () => {
              return clearError;
            }
          }
        ]}
      />

      <IonApp>
        <Header />
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl
                  selectedValue={calcUnits}
                  onSelectValue={selectCalcUnitHandler}
                />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Height ({calcUnits === "mkg" ? "meters" : "feet"})
                  </IonLabel>
                  <IonInput type="number" ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Weight ({calcUnits === "mkg" ? "kg" : "lbs"})
                  </IonLabel>
                  <IonInput type="number" ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />

            {/* Checks if calculatedBMI is null, if it is 
          null, then it will display this Ion Row since and */}
            {calculatedBMI && (
              <IonRow>
                <BmiResults result={calculatedBMI} />
              </IonRow>
            )}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
