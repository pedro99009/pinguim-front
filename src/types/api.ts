export interface Team {
    id: number
    abbreviation: string
    city: string
    conference: string
    division: string
    full_name: string
    name: string
  }
  
  export interface Player {
    id: number
    first_name: string
    last_name: string
    position: string
    team: Team
    height_feet: number | null
    height_inches: number | null
    weight_pounds: number | null
  }
  
  