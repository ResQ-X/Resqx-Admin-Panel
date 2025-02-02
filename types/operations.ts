export interface Incident {
    id: string
    location: string
    dateTime: string
    priority: "High" | "Medium" | "Low"
    responderId: string
    status: "In Progress" | "Canceled" | "Resolved" | "Unassigned"
    coordinates: {
      lat: number
      lng: number
    }
  }
  
  export interface Responder {
    id: string
    name: string
    status: "On Duty" | "Off Duty" | "Busy"
    location: string
    performanceMetrics: {
      avgResponseTime: string
      incidentsResolved: number
    }
  }
  
  export interface Partner {
    id: string
    name: string
    status: "On Duty" | "Off Duty" | "Busy"
    vehicles: number
    performanceMetrics: {
      avgResponseTime: string
      incidentsResolved: number
    }
  }
  
  export interface OperationsStats {
    activeResponders: number
    activePartners: number
    avgResponseTime: string
    requestsInProgress: number
    changes: {
      activeResponders: string
      activePartners: string
      avgResponseTime: string
      requestsInProgress: string
    }
  }
  
  export interface AssignmentDetails {
    id: string
    name: string
    status: string
    incident: {
      service: string
      timeReported: string
      priorityLevel: string
    }
    responder: {
      currentLocation: string
      eta: string
    }
  }
  
  