import { useState, useEffect } from 'react';
import { Button } from './components/Button';
import { Plus } from 'lucide-react';

const SIZES = ['sm', 'md', 'lg', 'xl'] as const;
const VARIANTS = ['solid', 'outline', 'soft', 'text'] as const;
const COLORS = ['base', 'grey', 'brand', 'error', 'ai'] as const;
const THEMES = [
  { label: 'Brand (Default)', value: '' },
  { label: 'Core', value: 'core' },
  { label: 'CX', value: 'cx' },
  { label: 'Assessment', value: 'assessment' },
  { label: 'Shell', value: 'shell' }
] as const;

function App() {
  const [theme, setTheme] = useState<string>(THEMES[0].value);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  return (
    <div className="showcase-container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>

        <div>
          <h1>Button Variants Showcase</h1>
          <p>282+ Variants mapped strictly from Design Tokens</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, color: 'var(--color-grey-900)' }}>Theme:</span>
          {THEMES.map(t => (
            <Button 
              key={t.value} 
              size="sm" 
              variant={theme === t.value ? 'solid' : 'outline'}
              colorScheme="brand"
              onClick={() => setTheme(t.value)}
            >
              {t.label}
            </Button>
          ))}
        </div>
      </header>

      {COLORS.map((color) => (
        <section key={color}>
          <h2 className="section-title">Color Scheme: {color.toUpperCase()}</h2>
          <div className="variant-grid">
            {VARIANTS.map((variant) => (
              <div key={variant} style={{ borderLeft: '4px solid #eee', paddingLeft: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#666', textTransform: 'capitalize' }}>
                  {variant}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {SIZES.map((size) => (
                    <div className="size-row" key={size}>
                      <div className="size-label">{size}</div>
                      <div className="components-row">
                        {/* 1. Label Only */}
                        <Button size={size} variant={variant} colorScheme={color}>
                          Label
                        </Button>
                        
                        {/* 2. Leading Icon */}
                        <Button size={size} variant={variant} colorScheme={color} leftIcon={<Plus />}>
                          Label
                        </Button>

                        {/* 3. Trailing Icon */}
                        <Button size={size} variant={variant} colorScheme={color} rightIcon={<Plus />}>
                          Label
                        </Button>

                        {/* 4. Icon Only (Square) */}
                        <Button size={size} variant={variant} colorScheme={color} iconOnly shape="square">
                          <Plus />
                        </Button>

                        {/* 5. Icon Only (Circle) */}
                        <Button size={size} variant={variant} colorScheme={color} iconOnly shape="circle">
                          <Plus />
                        </Button>
                        
                        {/* 6. Disabled State Example */}
                        <Button size={size} variant={variant} colorScheme={color} disabled>
                          Disabled
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
      
      <section>
        <h2 className="section-title">Pill Shape Variations</h2>
        <div className="size-row">
          <Button shape="pill" size="lg" colorScheme="brand" variant="solid">Pill Solid</Button>
          <Button shape="pill" size="lg" colorScheme="base" variant="outline">Pill Outline</Button>
          <Button shape="pill" size="lg" colorScheme="ai" variant="soft">Pill Soft</Button>
          <Button shape="pill" size="lg" colorScheme="error" variant="text">Pill Text</Button>
        </div>
      </section>

    </div>
  );
}

export default App;
