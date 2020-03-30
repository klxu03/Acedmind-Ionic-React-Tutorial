import React from "react";

import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

const InputControl: React.FC<{
  selectedValue: "mkg" | "ftlbs";
  onSelectValue: (value: "mkg" | "ftlbs") => void;
}> = props => {
  const inputChangeHandler = (event: CustomEvent) => {
    // Custom event is the type of an event being triggered
    props.onSelectValue(event.detail.value);
    //event.detail.value will either be 'mkg' or 'ftlbs'
  };

  return (
    <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler}>
      <IonSegmentButton value="mkg">
        <IonLabel>m/kg (Meters/Kg)</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="ftlbs">
        <IonLabel>ft/lbs (Feet/Lb)</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputControl;
