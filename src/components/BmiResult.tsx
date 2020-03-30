import React from "react";

import { IonCol, IonCard, IonCardContent } from "@ionic/react";

const BmiResult: React.FC<{
  result: number; // Result is either a number or a string
}> = props => {
  return (
    <IonCol>
      <IonCard>
        <IonCardContent className = "ion-text-center">
          <h2>Your Body-Mass-Index</h2>
          <h3>{props.result.toFixed(2)}</h3> 
          {/* toFixed limits the significant figures, or numbers after the decimal point */}
        </IonCardContent>
      </IonCard>
    </IonCol>
  );
};

export default BmiResult;