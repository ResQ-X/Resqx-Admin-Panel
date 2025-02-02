export interface OrderFormData {
    customerName: string
    emailAddress: string
    contactNumber: string
    location: string
    serviceType: string
    priorityLevel: string
    responder: string
    timeReported: string
    serviceFee: string
    paymentMethod: string
  }
  
  export interface CreateOrderState {
    step: "form" | "creating" | "success"
    progress: number
  }
  
  