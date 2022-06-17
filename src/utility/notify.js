
  export function notify(data) {
    if (!data.message && !data.HTML) {
      throw new Error("Cannot trigger notification without a message");
    }
  
    // future implementation will include
    // a notificaiton in line with the one
    // in accounts-ui
    return {
      type: "NEW_NOTIFICATION",
      data: {
        ...data,
        active: true,
        epoch: Date.now(),
      },
    };
  }
  
  