import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Briefcase,
  CandlestickChart,
  ChevronDown,
  CircleDashed,
  Clock3,
  CreditCard,
  Crown,
  Database,
  Gauge,
  GitBranch,
  Globe,
  LineChart as LineChartIcon,
  Lock,
  Menu,
  MessageSquareText,
  MoonStar,
  MousePointerClick,
  Percent,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UserRound,
  Wallet,
  Zap,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import './App.css'

const navItems = [
  { id: 'landing', label: 'Welcome', icon: Sparkles },
  { id: 'auth', label: 'Auth', icon: Lock },
  { id: 'dashboard', label: 'Dashboard', icon: Gauge },
  { id: 'explorer', label: 'Explorer', icon: Search },
  { id: 'prediction', label: 'Prediction', icon: TrendingUp },
  { id: 'technical', label: 'Technical', icon: CandlestickChart },
  { id: 'comparison', label: 'Comparison', icon: GitBranch },
  { id: 'portfolio', label: 'Portfolio', icon: Wallet },
  { id: 'watchlist', label: 'Watchlist', icon: Star },
  { id: 'evaluation', label: 'Evaluation', icon: Activity },
  { id: 'news', label: 'News', icon: MessageSquareText },
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'about', label: 'About', icon: Database },
]

const featureCards = [
  { title: 'AI Prediction', subtitle: 'Ensemble forecasting using ML', accent: 'blue' },
  { title: 'Technical Analysis', subtitle: 'RSI, MACD, SMA and trend signals', accent: 'cyan' },
  { title: 'Market Trends', subtitle: 'Sentiment-aware macro and sector view', accent: 'purple' },
  { title: 'Portfolio Tracking', subtitle: 'Real-time allocation and return watch', accent: 'green' },
]

const heroChartData = [
  { name: 'Jan', value: 118 },
  { name: 'Feb', value: 121 },
  { name: 'Mar', value: 130 },
  { name: 'Apr', value: 147 },
  { name: 'May', value: 152 },
  { name: 'Jun', value: 164 },
  { name: 'Jul', value: 179 },
  { name: 'Aug', value: 175 },
  { name: 'Sep', value: 196 },
  { name: 'Oct', value: 204 },
  { name: 'Nov', value: 214 },
  { name: 'Dec', value: 231 },
]

const marketOverview = [
  { symbol: 'AAPL', name: 'Apple', price: 214.34, change: 2.46, volume: '78.4M', sentiment: 'Bullish' },
  { symbol: 'MSFT', name: 'Microsoft', price: 449.8, change: 1.12, volume: '26.6M', sentiment: 'Strong' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 128.7, change: 3.84, volume: '52.1M', sentiment: 'Breakout' },
  { symbol: 'RELIANCE.NS', name: 'Reliance', price: 2825.5, change: -0.64, volume: '5.8M', sentiment: 'Watch' },
  { symbol: '^NSEI', name: 'Nifty 50', price: 24786.2, change: 0.82, volume: 'N/A', sentiment: 'Stable' },
]

const dashboardKpis = [
  { label: 'Selected stock', value: 'AAPL', delta: '+2.46%', positive: true },
  { label: 'Daily change', value: '$5.18', delta: '+1.86%', positive: true },
  { label: 'AI prediction', value: '$221.40', delta: 'Bullish', positive: true },
  { label: 'Model accuracy', value: '94.2%', delta: '+1.3%', positive: true },
]

const signalChart = [
  { name: 'Mon', price: 176 },
  { name: 'Tue', price: 182 },
  { name: 'Wed', price: 180 },
  { name: 'Thu', price: 187 },
  { name: 'Fri', price: 194 },
  { name: 'Sat', price: 192 },
  { name: 'Sun', price: 201 },
]

const predictionChart = [
  { date: 'Jan', actual: 198, pred: 201 },
  { date: 'Feb', actual: 202, pred: 205 },
  { date: 'Mar', actual: 209, pred: 212 },
  { date: 'Apr', actual: 214, pred: 217 },
  { date: 'May', actual: 219, pred: 221 },
  { date: 'Jun', actual: 223, pred: 225 },
  { date: 'Jul', actual: 228, pred: 232 },
]

const winTable = [
  { name: 'NVIDIA', price: 128.7, return: '+7.45%', status: 'gainer' },
  { name: 'TESLA', price: 269.2, return: '+4.91%', status: 'gainer' },
  { name: 'AMD', price: 165.8, return: '+3.12%', status: 'gainer' },
  { name: 'META', price: 514.1, return: '-2.11%', status: 'loser' },
  { name: 'NFLX', price: 621.4, return: '-1.65%', status: 'loser' },
]

const watchlistData = [
  { symbol: 'AAPL', price: 214.34, change: 2.46, trend: [12, 17, 19, 21, 18, 24, 26] },
  { symbol: 'MSFT', price: 449.8, change: 1.12, trend: [18, 16, 19, 24, 26, 28, 30] },
  { symbol: 'NVDA', price: 128.7, change: 3.84, trend: [8, 11, 10, 15, 17, 19, 21] },
  { symbol: 'TSLA', price: 269.2, change: -1.1, trend: [24, 22, 20, 18, 17, 16, 15] },
  { symbol: 'RELIANCE.NS', price: 2825.5, change: -0.64, trend: [11, 12, 10, 14, 13, 12, 11] },
  { symbol: 'TCS.NS', price: 3865.2, change: 0.83, trend: [19, 20, 21, 23, 22, 24, 25] },
]

const comparisonData = [
  { month: 'Jan', AAPL: 100, MSFT: 100, NVDA: 100, TSLA: 100 },
  { month: 'Mar', AAPL: 108, MSFT: 112, NVDA: 121, TSLA: 97 },
  { month: 'May', AAPL: 116, MSFT: 119, NVDA: 142, TSLA: 105 },
  { month: 'Jul', AAPL: 124, MSFT: 130, NVDA: 176, TSLA: 118 },
  { month: 'Sep', AAPL: 130, MSFT: 138, NVDA: 190, TSLA: 126 },
  { month: 'Dec', AAPL: 136, MSFT: 149, NVDA: 212, TSLA: 134 },
]

const technicalData = [
  { name: '1', price: 120, sma20: 118, sma50: 110, ema: 116, rsi: 64 },
  { name: '2', price: 122, sma20: 119, sma50: 112, ema: 117, rsi: 66 },
  { name: '3', price: 126, sma20: 120, sma50: 113, ema: 120, rsi: 68 },
  { name: '4', price: 124, sma20: 123, sma50: 114, ema: 122, rsi: 62 },
  { name: '5', price: 130, sma20: 125, sma50: 116, ema: 124, rsi: 70 },
  { name: '6', price: 135, sma20: 129, sma50: 118, ema: 128, rsi: 74 },
  { name: '7', price: 134, sma20: 131, sma50: 121, ema: 130, rsi: 71 },
]

const portfolioHoldings = [
  { ticker: 'AAPL', quantity: 16, buyPrice: 175, currentPrice: 214.34 },
  { ticker: 'MSFT', quantity: 8, buyPrice: 390, currentPrice: 449.8 },
  { ticker: 'NVDA', quantity: 22, buyPrice: 92, currentPrice: 128.7 },
  { ticker: 'TCS.NS', quantity: 18, buyPrice: 3200, currentPrice: 3865.2 },
]

const portfolioBreakdown = [
  { label: 'Technology', value: 46 },
  { label: 'Semiconductors', value: 31 },
  { label: 'IT Services', value: 23 },
]

const evaluationData = [
  { model: 'Linear Regression', mae: 5.4, rmse: 7.2, accuracy: 82 },
  { model: 'Random Forest', mae: 3.8, rmse: 5.1, accuracy: 89 },
  { model: 'Gradient Boosting', mae: 2.9, rmse: 4.3, accuracy: 94 },
]

const newsItems = [
  { source: 'Bloomberg', title: 'AI chip demand lifts semiconductor leaders while analysts raise price targets.', timestamp: '2 hours ago', url: '#' },
  { source: 'Reuters', title: 'Rate-cut expectations and earnings momentum keep large-cap tech in focus.', timestamp: '4 hours ago', url: '#' },
  { source: 'CNBC', title: 'Nifty auto and banking names show strong relative strength into quarterly results.', timestamp: 'Today', url: '#' },
]

const profileSettings = [
  { label: 'Dark theme default', value: 'Enabled' },
  { label: 'Portfolio alert level', value: 'Moderate' },
  { label: 'Prediction horizon', value: '7 calendar days' },
  { label: 'Data source', value: 'Yahoo Finance' },
]

const searchResults = [
  { symbol: 'AAPL', company: 'Apple Inc.', market: 'NASDAQ', price: '$214.34', change: '+2.46%' },
  { symbol: 'MSFT', company: 'Microsoft Corp.', market: 'NASDAQ', price: '$449.80', change: '+1.12%' },
  { symbol: 'GOOGL', company: 'Alphabet Inc.', market: 'NASDAQ', price: '$174.91', change: '+0.95%' },
  { symbol: 'RELIANCE.NS', company: 'Reliance Industries Ltd.', market: 'NSE', price: '₹2,825.50', change: '-0.64%' },
]

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [authMode, setAuthMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRange, setSelectedRange] = useState('1M')
  const [selectedModel, setSelectedModel] = useState('Gradient Boosting')

  const filteredWatchlist = useMemo(() => {
    return watchlistData.filter((stock) => stock.symbol.toLowerCase().includes('a') || stock.symbol.includes('RELIANCE'))
  }, [])

  const renderPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage setActivePage={setActivePage} />
      case 'auth':
        return <AuthPage authMode={authMode} setAuthMode={setAuthMode} showPassword={showPassword} setShowPassword={setShowPassword} />
      case 'dashboard':
        return (
          <DashboardPage
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
            filteredWatchlist={filteredWatchlist}
          />
        )
      case 'explorer':
        return <ExplorerPage />
      case 'prediction':
        return <PredictionPage selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
      case 'technical':
        return <TechnicalPage />
      case 'comparison':
        return <ComparisonPage />
      case 'portfolio':
        return <PortfolioPage />
      case 'watchlist':
        return <WatchlistPage />
      case 'evaluation':
        return <EvaluationPage />
      case 'news':
        return <NewsPage />
      case 'profile':
        return <ProfilePage />
      case 'about':
        return <AboutPage />
      default:
        return <DashboardPage selectedRange={selectedRange} setSelectedRange={setSelectedRange} filteredWatchlist={filteredWatchlist} />
    }
  }

  return (
    <div className="stockpulse-app">
      <aside className="sidebar">
        <div className="brand-wrap">
          <div className="brand-mark">AI</div>
          <div>
            <div className="brand-name">AI StockPulse</div>
            <div className="brand-subtitle">Market intelligence</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`nav-item ${activePage === id ? 'active' : ''}`}
              onClick={() => setActivePage(id)}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <div className="small-label">AI forecast</div>
          <div className="mini-value">Bullish</div>
          <p>Technology sector momentum remains above long-run trend with improved breadth.</p>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-search">
            <Search size={16} />
            <input type="text" placeholder="Search ticker or company" value="AAPL" readOnly />
          </div>

          <div className="topbar-actions">
            <div className="status-pill">
              <span className="status-dot" />
              Market open
            </div>
            <button type="button" className="icon-button" aria-label="Notifications">
              <Bell size={16} />
            </button>
            <button type="button" className="icon-button" aria-label="Theme">
              <MoonStar size={16} />
            </button>
            <div className="profile-badge">
              <div className="profile-avatar">RD</div>
              <div>
                <div className="profile-name">Rutuja Dadas</div>
                <div className="profile-role">Investor</div>
              </div>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <div className="page-content">{renderPage()}</div>
      </main>
    </div>
  )
}

function LandingPage({ setActivePage }) {
  return (
    <motion.section className="landing-page" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <div className="hero-panel">
        <div className="hero-copy">
          <div className="eyebrow">AI-based stock intelligence</div>
          <h1>Predict Smarter. Analyze Deeper. Invest Informed.</h1>
          <p>
            AI StockPulse combines market data, technical indicators, and ML forecasting to help you
            evaluate opportunities with confidence.
          </p>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => setActivePage('dashboard')}>
              Explore Dashboard
            </button>
            <button type="button" className="secondary-button" onClick={() => setActivePage('auth')}>
              Get Started
            </button>
          </div>
          <div className="hero-stats">
            <div>
              <strong>1.2M+</strong>
              <span>market points analyzed</span>
            </div>
            <div>
              <strong>94.2%</strong>
              <span>model test accuracy</span>
            </div>
            <div>
              <strong>4.8/5</strong>
              <span>portfolio confidence</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="chart-card floating-card">
            <div className="card-topline">
              <span className="chip positive">Bullish</span>
              <span className="muted">NASDAQ 100</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={heroChartData}>
                <defs>
                  <linearGradient id="heroGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#4F8CFF" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#4F8CFF" stopOpacity={0.06} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#7d8aa5" />
                <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#4F8CFF" strokeWidth={3} fill="url(#heroGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="floating-tile tile-one">
            <span className="trend-label">AI Signal</span>
            <strong>+8.7%</strong>
            <small>Momentum up</small>
          </div>
          <div className="floating-tile tile-two">
            <span className="trend-label">Risk Score</span>
            <strong>31 / 100</strong>
            <small>Moderate</small>
          </div>
        </div>
      </div>

      <div className="feature-grid">
        {featureCards.map((feature, index) => (
          <motion.div
            key={feature.title}
            className={`feature-card accent-${feature.accent}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12 }}
          >
            <div className="feature-icon">
              {index === 0 && <Sparkles size={18} />}
              {index === 1 && <CandlestickChart size={18} />}
              {index === 2 && <TrendingUp size={18} />}
              {index === 3 && <Briefcase size={18} />}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function AuthPage({ authMode, setAuthMode, showPassword, setShowPassword }) {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-badge">AI</div>
          <div>
            <div className="brand-name">AI StockPulse</div>
            <div className="brand-subtitle">Secure access</div>
          </div>
        </div>

        <div className="auth-tabs">
          <button type="button" className={authMode === 'login' ? 'tab active' : 'tab'} onClick={() => setAuthMode('login')}>
            Login
          </button>
          <button type="button" className={authMode === 'signup' ? 'tab active' : 'tab'} onClick={() => setAuthMode('signup')}>
            Sign Up
          </button>
        </div>

        <form className="auth-form">
          <label>
            <span>Email address</span>
            <input type="email" placeholder="enter@stockpulse.ai" />
          </label>
          <label>
            <span>Password</span>
            <div className="password-wrap">
              <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" />
              <button type="button" className="password-toggle" onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          {authMode === 'signup' && (
            <label>
              <span>Full name</span>
              <input type="text" placeholder="Rutuja Dadas" />
            </label>
          )}

          <div className="auth-meta">
            <label className="checkbox-row">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="primary-button fluid">
            {authMode === 'login' ? 'Login to dashboard' : 'Create account'}
          </button>

          <div className="demo-label">Demo mode only — no production credentials are embedded.</div>
        </form>
      </div>
    </section>
  )
}

function DashboardPage({ selectedRange, setSelectedRange, filteredWatchlist }) {
  return (
    <>
      <section className="page-header">
        <div>
          <div className="eyebrow">Portfolio overview</div>
          <h2>Market dashboard</h2>
        </div>
        <div className="header-actions">
          <div className="range-switcher">
            {['1D', '1W', '1M', '3M', '6M', '1Y', '5Y'].map((range) => (
              <button
                key={range}
                type="button"
                className={selectedRange === range ? 'range active' : 'range'}
                onClick={() => setSelectedRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
          <button type="button" className="secondary-button small">Refresh data</button>
        </div>
      </section>

      <section className="stats-grid">
        {dashboardKpis.map((card) => (
          <div key={card.label} className="stat-card">
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <em className={card.positive ? 'positive' : 'negative'}>{card.delta}</em>
          </div>
        ))}
      </section>

      <section className="content-grid two-col">
        <div className="panel large-panel">
          <div className="panel-heading">
            <div>
              <div className="small-label">Price trend</div>
              <h3>Historical performance</h3>
            </div>
            <div className="panel-badges">
              <span className="badge positive">+4.82%</span>
            </div>
          </div>

          <div className="chart-wrap lg">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={signalChart}>
                <defs>
                  <linearGradient id="areaChartFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#4F8CFF" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#4F8CFF" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#24334F" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#7d8aa5" tickLine={false} axisLine={false} />
                <YAxis stroke="#7d8aa5" tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="price" stroke="#4F8CFF" strokeWidth={3} fill="url(#areaChartFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <div className="small-label">Watchlist</div>
              <h3>Tracked equities</h3>
            </div>
            <button type="button" className="icon-button slim"><Plus size={14} /></button>
          </div>

          <div className="watchlist-stack">
            {filteredWatchlist.map((stock) => (
              <div key={stock.symbol} className="watch-row">
                <div>
                  <strong>{stock.symbol}</strong>
                  <span>{stock.price}</span>
                </div>
                <div className="trend-pill positive">{stock.change > 0 ? '+' : ''}{stock.change}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid three-col">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <div className="small-label">Overview</div>
              <h3>Market snapshot</h3>
            </div>
          </div>
          <div className="list-stack">
            {marketOverview.map((item) => (
              <div key={item.symbol} className="market-row">
                <div className="ticker-block">
                  <strong>{item.symbol}</strong>
                  <span>{item.name}</span>
                </div>
                <div className="market-metrics">
                  <span>{item.price}</span>
                  <em className={item.change >= 0 ? 'positive' : 'negative'}>{item.change >= 0 ? '+' : ''}{item.change}%</em>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <div className="small-label">Top movers</div>
              <h3>Gainers & losers</h3>
            </div>
          </div>
          <div className="list-stack">
            {winTable.map((item) => (
              <div key={item.name} className="market-row">
                <div className="ticker-block">
                  <strong>{item.name}</strong>
                  <span>{item.price}</span>
                </div>
                <em className={item.status === 'gainer' ? 'positive' : 'negative'}>{item.return}</em>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <div className="small-label">AI summary</div>
              <h3>Market commentary</h3>
            </div>
          </div>
          <p className="ai-summary">
            Momentum remains positive in AI and semiconductor names while defensive sectors lag. The model
            indicates improving breadth and stable liquidity conditions for the next 7–30 days.
          </p>
          <div className="summary-bullets">
            <div><span className="bullet positive" /> Earnings support</div>
            <div><span className="bullet cyan" /> Sector rotation</div>
            <div><span className="bullet purple" /> Volatility in check</div>
          </div>
        </div>
      </section>
    </>
  )
}

function ExplorerPage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <div className="eyebrow">Market explorer</div>
          <h2>Search and discover companies</h2>
        </div>
      </div>

      <div className="explorer-panel panel">
        <div className="search-box large">
          <Search size={16} />
          <input type="text" placeholder="Search by ticker or company name" value="AAPL" readOnly />
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Company</th>
                <th>Exchange</th>
                <th>Last</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((row) => (
                <tr key={row.symbol}>
                  <td>{row.symbol}</td>
                  <td>{row.company}</td>
                  <td>{row.market}</td>
                  <td>{row.price}</td>
                  <td className={row.change.startsWith('+') ? 'positive' : 'negative'}>{row.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function PredictionPage({ selectedModel, setSelectedModel }) {
  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <div className="eyebrow">AI forecasting</div>
          <h2>Price prediction engine</h2>
        </div>
        <div className="header-actions">
          <select className="select-input" value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)}>
            <option>Linear Regression</option>
            <option>Random Forest</option>
            <option>Gradient Boosting</option>
          </select>
        </div>
      </div>

      <div className="content-grid two-col">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <div className="small-label">Forecast</div>
              <h3>Next 30-day estimate</h3>
            </div>
          </div>
          <div className="prediction-value-block">
            <strong>$221.40</strong>
            <span className="positive">+6.8% vs reference</span>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart data={predictionChart}>
                <CartesianGrid stroke="#24334F" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" stroke="#7d8aa5" tickLine={false} axisLine={false} />
                <YAxis stroke="#7d8aa5" tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="actual" stroke="#22D3EE" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="pred" stroke="#9B7CFF" strokeWidth={3} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <div className="small-label">Model note</div>
              <h3>Experimental output</h3>
            </div>
          </div>
          <ul className="info-list">
            <li>Horizon: 30 calendar days</li>
            <li>Reference price: $207.30</li>
            <li>Model: Gradient Boosting</li>
            <li>Uncertainty: ±3.6% based on validation window</li>
            <li className="warning">Predictions are estimates, not guaranteed future prices.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function TechnicalPage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <div className="eyebrow">Technical analysis</div>
          <h2>Indicators and price structure</h2>
        </div>
      </div>

      <div className="panel">
        <div className="chart-wrap lg">
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={technicalData}>
              <CartesianGrid stroke="#24334F" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#7d8aa5" tickLine={false} axisLine={false} />
              <YAxis stroke="#7d8aa5" tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#4F8CFF" strokeWidth={2} />
              <Line type="monotone" dataKey="sma20" stroke="#22D3EE" strokeWidth={1.5} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="sma50" stroke="#9B7CFF" strokeWidth={1.5} strokeDasharray="2 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="indicator-grid">
        <div className="mini-indicator">
          <span>RSI</span>
          <strong>68.4</strong>
          <small>Trending higher, but not overbought</small>
        </div>
        <div className="mini-indicator">
          <span>MACD</span>
          <strong>Positive</strong>
          <small>Signal line crossing above zero</small>
        </div>
        <div className="mini-indicator">
          <span>Bollinger</span>
          <strong>Upper band</strong>
          <small>Price near upper bound</small>
        </div>
        <div className="mini-indicator">
          <span>Volume</span>
          <strong>Elevated</strong>
          <small>Strong participation</small>
        </div>
      </div>
    </section>
  )
}

function ComparisonPage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <div className="eyebrow">Relative performance</div>
          <h2>Stock comparison matrix</h2>
        </div>
      </div>

      <div className="panel">
        <div className="chart-wrap lg">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={comparisonData}>
              <CartesianGrid stroke="#24334F" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#7d8aa5" tickLine={false} axisLine={false} />
              <YAxis stroke="#7d8aa5" tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="AAPL" stroke="#4F8CFF" strokeWidth={2} />
              <Line type="monotone" dataKey="MSFT" stroke="#22D3EE" strokeWidth={2} />
              <Line type="monotone" dataKey="NVDA" stroke="#9B7CFF" strokeWidth={2} />
              <Line type="monotone" dataKey="TSLA" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="comparison-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Return</th>
              <th>Volatility</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AAPL</td>
              <td className="positive">+36%</td>
              <td>18.4%</td>
              <td>78.4M</td>
            </tr>
            <tr>
              <td>MSFT</td>
              <td className="positive">+49%</td>
              <td>16.2%</td>
              <td>26.6M</td>
            </tr>
            <tr>
              <td>NVDA</td>
              <td className="positive">+112%</td>
              <td>24.8%</td>
              <td>52.1M</td>
            </tr>
            <tr>
              <td>TSLA</td>
              <td className="negative">-3%</td>
              <td>27.1%</td>
              <td>31.2M</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

function PortfolioPage() {
  const totalInvested = portfolioHoldings.reduce((sum, item) => sum + item.quantity * item.buyPrice, 0)
  const totalValue = portfolioHoldings.reduce((sum, item) => sum + item.quantity * item.currentPrice, 0)
  const pnl = totalValue - totalInvested

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <div className="eyebrow">Portfolio tracker</div>
          <h2>Allocation and performance</h2>
        </div>
      </div>

      <div className="stats-grid compact">
        <div className="stat-card">
          <span>Invested</span>
          <strong>${totalInvested.toLocaleString()}</strong>
        </div>
        <div className="stat-card">
          <span>Market value</span>
          <strong>${totalValue.toLocaleString()}</strong>
        </div>
        <div className="stat-card">
          <span>P/L</span>
          <strong className={pnl >= 0 ? 'positive' : 'negative'}>${pnl.toFixed(0)}</strong>
        </div>
      </div>

      <div className="content-grid two-col">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <div className="small-label">Holdings</div>
              <h3>Portfolio positions</h3>
            </div>
          </div>
          <div className="holding-list">
            {portfolioHoldings.map((holding) => {
              const value = holding.quantity * holding.currentPrice
              const ret = ((holding.currentPrice - holding.buyPrice) / holding.buyPrice) * 100
              return (
                <div key={holding.ticker} className="holding-row">
                  <div>
                    <strong>{holding.ticker}</strong>
                    <span>{holding.quantity} shares</span>
                  </div>
                  <div className="holdings-metrics">
                    <span>${value.toFixed(0)}</span>
                    <em className={ret >= 0 ? 'positive' : 'negative'}>{ret >= 0 ? '+' : ''}{ret.toFixed(1)}%</em>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <div className="small-label">Allocation</div>
              <h3>Sector mix</h3>
            </div>
          </div>
          <div className="allocation-list">
            {portfolioBreakdown.map((item) => (
              <div key={item.label} className="alloc-row">
                <div className="alloc-label">
                  <span className="dot purple" />
                  {item.label}
                </div>
                <div className="alloc-value">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WatchlistPage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <div className="eyebrow">Watchlist</div>
          <h2>Tracked opportunities</h2>
        </div>
      </div>

      <div className="watchlist-grid">
        {watchlistData.map((stock) => (
          <div key={stock.symbol} className="watch-card">
            <div className="watch-head">
              <div>
                <strong>{stock.symbol}</strong>
                <span>{stock.price}</span>
              </div>
              <div className={stock.change >= 0 ? 'trend-pill positive' : 'trend-pill negative'}>
                {stock.change >= 0 ? '+' : ''}{stock.change}%
              </div>
            </div>
            <div className="mini-chart">
              <ResponsiveContainer width="100%" height={70}>
                <LineChart data={stock.trend.map((value, index) => ({ value, label: index }))}>
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke={stock.change >= 0 ? '#4F8CFF' : '#f87171'} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function EvaluationPage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <div className="eyebrow">Model evaluation</div>
          <h2>Actual vs predicted results</h2>
        </div>
      </div>

      <div className="panel">
        <div className="chart-wrap lg">
          <ResponsiveContainer width="100%" height={310}>
            <BarChart data={evaluationData}>
              <CartesianGrid stroke="#24334F" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="model" stroke="#7d8aa5" tickLine={false} axisLine={false} />
              <YAxis stroke="#7d8aa5" tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="accuracy" fill="#4F8CFF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="evaluation-grid">
        {evaluationData.map((model) => (
          <div key={model.model} className="eval-card">
            <h4>{model.model}</h4>
            <div className="metric-row"><span>MAE</span><strong>{model.mae}</strong></div>
            <div className="metric-row"><span>RMSE</span><strong>{model.rmse}</strong></div>
            <div className="metric-row"><span>Accuracy</span><strong>{model.accuracy}%</strong></div>
          </div>
        ))}
      </div>
    </section>
  )
}

function NewsPage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <div className="eyebrow">Market insights</div>
          <h2>Latest market updates</h2>
        </div>
      </div>

      <div className="news-grid">
        {newsItems.map((item) => (
          <article key={item.title} className="news-card">
            <div className="news-source">{item.source}</div>
            <h3>{item.title}</h3>
            <div className="news-meta">
              <span>{item.timestamp}</span>
              <a href={item.url}>Read article</a>
            </div>
          </article>
        ))}
      </div>

      <div className="setup-message">
        No news API key is configured yet. This section shows clearly labeled example content until a valid provider is connected.
      </div>
    </section>
  )
}

function ProfilePage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <div className="eyebrow">Profile</div>
          <h2>Account settings</h2>
        </div>
      </div>

      <div className="profile-grid">
        <div className="panel">
          <div className="profile-card-header">
            <div className="profile-avatar large">RD</div>
            <div>
              <h3>Rutuja Dadas</h3>
              <p>Professional investor</p>
            </div>
          </div>
          <div className="settings-list">
            {profileSettings.map((item) => (
              <div key={item.label} className="settings-row">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <div className="small-label">Update</div>
              <h3>Password and preferences</h3>
            </div>
          </div>
          <form className="settings-form">
            <label>
              <span>Current password</span>
              <input type="password" placeholder="••••••••" />
            </label>
            <label>
              <span>New password</span>
              <input type="password" placeholder="••••••••" />
            </label>
            <button type="submit" className="primary-button fluid">Save changes</button>
          </form>
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <div className="eyebrow">Project overview</div>
          <h2>AI StockPulse architecture</h2>
        </div>
      </div>

      <div className="about-grid">
        <div className="panel">
          <h3>System architecture</h3>
          <p>
            The platform ingests historical market data from Yahoo Finance, normalizes technical indicators,
            trains ML models with time-aware validation, and exposes curated dashboards through a secure REST API.
          </p>
        </div>
        <div className="panel">
          <h3>Technologies</h3>
          <ul className="info-list compact">
            <li>React + Vite frontend</li>
            <li>Flask/FastAPI backend</li>
            <li>Pandas, NumPy, scikit-learn</li>
            <li>SQLite persistence</li>
          </ul>
        </div>
        <div className="panel">
          <h3>ML workflow</h3>
          <p>
            Data is filtered for valid market dates, features are engineered with lag values and moving averages,
            and models are evaluated on a chronological holdout set to avoid leakage.
          </p>
        </div>
        <div className="panel">
          <h3>Limitations</h3>
          <p>
            Forecasts are experimental estimates and are not guaranteed future prices. Data latency and provider
            constraints can affect live market updates.
          </p>
        </div>
      </div>
    </section>
  )
}

export default App
