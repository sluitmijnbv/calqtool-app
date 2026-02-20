export function evaluatePolicy(state) {

  if (state.plan === "trial" &&
      state.usage.export >= 1) {

    return {
      blocked: true,
      message: "Upgrade vereist voor extra exports."
    }
  }

  return { blocked: false }
}