import { useState, useContext } from "react";

import { TouchingOuterContext } from "../../pages/gallery-previews";

export default function useTouchingOuterState() {
  const TouchingOuterState = useContext(TouchingOuterContext);

  return TouchingOuterState;
}
