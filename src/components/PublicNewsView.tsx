import React, { useState, useEffect } from 'react'
import { Calendar, User, ExternalLink } from 'lucide-react'
import { supabase, News, Section } from '../lib/supabase'

interface PublicNewsViewProps {
  searchQuery: string
}

const PublicNewsView: React.FC<PublicNewsViewProps> = ({ searchQuery }) => {
  const [news, setNews] = useState<News[]>([])
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState<string>('all')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [newsResult, sectionsResult] = await Promise.all([
        supabase
          .from('news')
          .select(`
            *,
            section:sections(*)
          `)
          .order('order_index', { ascending: false })
          .order('created_at', { ascending: false }),
        supabase
          .from('sections')
          .select('*')
          .order('order_index', { ascending: true })
      ])

      if (newsResult.data) setNews(newsResult.data)
      if (sectionsResult.data) setSections(sectionsResult.data)
    } catch (error) {
      console.error('Errore caricamento dati:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredNews = news.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSection = selectedSection === 'all' || item.section_id === selectedSection
    
    return matchesSearch && matchesSection
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Notizie</h2>
        
        {/* Filtro Sezioni */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSection('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedSection === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tutte le sezioni
          </button>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Lista News */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                {item.section && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item.section.title}
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {item.content}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{item.created_by}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-2">Nessun articolo trovato</div>
          <p className="text-gray-400 text-sm">
            {searchQuery ? 'Prova a modificare i termini di ricerca' : 'Non ci sono articoli disponibili'}
          </p>
        </div>
      )}
    </div>
  )
}

export default PublicNewsView