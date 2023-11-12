export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      assets: {
        Row: {
          category: string | null
          cost: number | null
          created_at: string
          id: string
          model_id: string | null
          name: string | null
          project_id: string | null
          speckle_id: string | null
          version_id: string | null
        }
        Insert: {
          category?: string | null
          cost?: number | null
          created_at?: string
          id?: string
          model_id?: string | null
          name?: string | null
          project_id?: string | null
          speckle_id?: string | null
          version_id?: string | null
        }
        Update: {
          category?: string | null
          cost?: number | null
          created_at?: string
          id?: string
          model_id?: string | null
          name?: string | null
          project_id?: string | null
          speckle_id?: string | null
          version_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
