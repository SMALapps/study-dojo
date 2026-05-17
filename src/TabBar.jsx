const TABS = [
  { id: 'dojo',     label: 'DOJO'     },
  { id: 'train',    label: 'TRAIN'    },
  { id: 'progress', label: 'PROGRESS' },
  { id: 'themes',   label: 'THEMES'   },
  { id: 'settings', label: 'SETTINGS' },
];

const ICON_SRC = {
  dojo:     '/dojo-icon.png',
  train:    '/train-icon.png',
  progress: '/progress-icon.png',
  themes:   '/themes-icon.png',
  settings: '/settings-icon.png',
};

export default function TabBar({ activeId, onTabChange }) {
  const activeIdx        = TABS.findIndex(t => t.id === activeId);
  const tabUnderlineLeft = `calc(${activeIdx} * 20% + 10% - 14px)`;

  return (
    <div className="tab-bar">
      {TABS.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <div
            key={tab.id}
            className={`tab-item${isActive ? ' active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">
              <img
                src={ICON_SRC[tab.id]}
                alt=""
                className={`tab-png-icon${isActive ? ' tab-png-active' : ''}`}
              />
            </span>
            <span className="tab-label">{tab.label}</span>
          </div>
        );
      })}
      <div className="tab-underline" style={{ left: tabUnderlineLeft }} />
      <div className="home-indicator" />
    </div>
  );
}
