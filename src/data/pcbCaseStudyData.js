// PCB AI Defect Inspection & Smart Manufacturing System Data
// Authentic project specification directly aligned with project architecture

export const PCB_APP_URL = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_PCB_APP_URL) 
  || 'https://pcb-frontend.getvoroa.com/';

export const pcbCaseStudy = {
  id: 'pcb-defect-detection',
  title: 'PCB AI Defect Inspection & Smart Manufacturing System',
  shortTitle: 'PCB Defect Detection',
  oneLineSummary: 'An AI-powered PCB inspection platform combining YOLOv8, Computer Vision, React, FastAPI, MongoDB, ROS 2, and Gazebo to enable real-time mobile and simulated industrial PCB defect detection.',
  shortDescription: 'AI-powered PCB defect inspection system using YOLOv8 to detect 7 PCB defect types with real-time camera/mobile inspection, FastAPI backend, MongoDB tracking, and ROS 2 + Gazebo industrial simulation.',
  category: 'Industrial AI / Computer Vision / Robotics',
  status: 'Production Prototype // Industry 4.0',
  liveUrl: PCB_APP_URL,
  modelName: 'Ultralytics YOLOv8 (best.pt)',
  simulationEngine: 'ROS 2 Jazzy + Gazebo Sim 8',
  backendEngine: 'Python FastAPI REST + WebSockets',
  databaseEngine: 'MongoDB Industrial Tracking',
  frontendEngine: 'React + Vite (Desktop & Mobile)',

  // Key system badges
  specs: [
    { label: 'AI Architecture', value: 'Ultralytics YOLOv8' },
    { label: 'Trained Weights', value: 'best.pt' },
    { label: 'Defect Classes', value: '7 Defect Categories' },
    { label: 'Industrial Robotics', value: 'ROS 2 Jazzy & Gazebo Sim 8' },
    { label: 'Backend API', value: 'Python FastAPI' },
    { label: 'Inspection Database', value: 'MongoDB Records' },
    { label: 'Sensor Camera', value: '640x480 R8G8B8 @ 10 FPS' },
    { label: 'Station Logic', value: '1-by-1 Sequential Conveyor' },
  ],

  // 16 Key Highlights directly from spec
  keyHighlights: [
    { icon: 'Bot', text: 'YOLOv8-based PCB defect detection' },
    { icon: 'Search', text: '7 PCB defect classes' },
    { icon: 'Smartphone', text: 'Mobile camera inspection' },
    { icon: 'Camera', text: 'Real-time camera-based detection' },
    { icon: 'Box', text: 'Bounding boxes & confidence scores' },
    { icon: 'Server', text: 'FastAPI AI backend' },
    { icon: 'Database', text: 'MongoDB inspection history' },
    { icon: 'Factory', text: 'Industrial inspection workflow' },
    { icon: 'Cpu', text: 'ROS 2 integration' },
    { icon: 'Globe', text: 'Gazebo virtual production line' },
    { icon: 'Truck', text: 'Conveyor-based PCB inspection' },
    { icon: 'Radio', text: 'Sensor-triggered inspection' },
    { icon: 'Activity', text: 'Industrial monitoring dashboard' },
    { icon: 'RefreshCw', text: 'One-by-one PCB inspection workflow' },
    { icon: 'Eye', text: 'Computer Vision + Deep Learning' },
    { icon: 'Sparkles', text: 'Smart Manufacturing / Industry 4.0 concept' },
  ],

  // Project Goals
  goals: [
    'Automatically inspect PCB images using deep learning object detection',
    'Detect manufacturing defects with precise localized bounding boxes',
    'Display confidence scores and quality classifications in real-time',
    'Track individual PCBs with unique PCB IDs and Inspection IDs',
    'Store inspection results and audit history in MongoDB',
    'Monitor multiple machines and cameras across inspection stations',
    'Support shop-floor mobile inspection without dedicated desktop hardware',
    'Simulate an industrial conveyor inspection line using Gazebo and ROS 2',
    'Provide a scalable architecture extendable toward Industry 4.0 and Smart Manufacturing'
  ],

  // 7 Defect Classes with industrial details
  defectClasses: [
    {
      id: 'copper',
      name: 'Copper',
      badge: 'DEFECT_01',
      severity: 'High',
      color: '#ef4444',
      description: 'Detects unwanted, excess, or stray copper regions on the PCB substrate that violate clearance standards and cause potential bridging.',
      impact: 'Risk of electrical leakage, stray capacitance, and accidental shorts under high voltage.',
      action: 'REWORK / Chemical Etching Review'
    },
    {
      id: 'mousebite',
      name: 'Mousebite',
      badge: 'DEFECT_02',
      severity: 'Medium',
      color: '#f97316',
      description: 'Detects mouse-bite type PCB edge defects, breakaway perforations, and rough separation tears along the board perimeter.',
      impact: 'Mechanical weakness, board cracking, and assembly fixture misalignment during panel singulation.',
      action: 'REWORK / Router Profiling Check'
    },
    {
      id: 'open',
      name: 'Open',
      badge: 'DEFECT_03',
      severity: 'Critical',
      color: '#dc2626',
      description: 'Detects open-circuit related PCB defects where a conductive copper trace or via connection is broken or discontinued.',
      impact: 'Complete functional failure of electrical signal pathways and broken logic circuits.',
      action: 'FAIL / Solder Jumper or Scrapped'
    },
    {
      id: 'pin-hole',
      name: 'Pin-hole',
      badge: 'DEFECT_04',
      severity: 'Medium',
      color: '#eab308',
      description: 'Detects microscopic pin-hole voids and air bubbles in conductive copper surfaces, solder masks, or ground planes.',
      impact: 'Susceptibility to moisture ingress, localized oxidation, and eventual trace burnout over thermal cycles.',
      action: 'REVIEW / Layer Reseal'
    },
    {
      id: 'short',
      name: 'Short',
      badge: 'DEFECT_05',
      severity: 'Critical',
      color: '#b91c1c',
      description: 'Detects unintended conductive bridges and copper slivers crossing between separate traces, violating electrical isolation.',
      impact: 'Power-to-ground short circuits leading to immediate board burnout, component damage, or fire risk.',
      action: 'FAIL / Trace Laser Trimming'
    },
    {
      id: 'spur',
      name: 'Spur',
      badge: 'DEFECT_06',
      severity: 'Medium',
      color: '#fb923c',
      description: 'Detects unwanted copper spur formations, pointed copper protrusions extending outwards from conductive tracks.',
      impact: 'Reduces electrical clearance distances, increasing risk of arc-over and solder bridging during wave soldering.',
      action: 'REWORK / Precision Deburring'
    },
    {
      id: 'missing-hole',
      name: 'Missing Hole',
      badge: 'DEFECT_07',
      severity: 'Critical',
      color: '#ea580c',
      description: 'Detects missing PCB mounting holes, unpunched component pin-through holes, or blocked vias on unpopulated boards.',
      impact: 'Through-hole component assembly failure; unable to insert IC pins or mechanical mounting standoffs.',
      action: 'REWORK / Secondary CNC Drilling'
    }
  ],

  // Authentic Sample Inspection Record
  sampleRecord: {
    pcbId: 'PCB_079',
    inspectionId: '79',
    machineId: 'MACHINE_SURAT_LINE_A',
    cameraId: 'CAM_AOI_OVERHEAD_01',
    defectType: 'Missing Hole',
    confidence: '77.24%',
    totalDefects: 1,
    status: 'REWORK',
    qualityDecision: 'FAIL / REWORK',
    boundingBox: { x1: 142, y1: 88, x2: 218, y2: 156 },
    timestamp: '2026-11-07 14:32:10 UTC'
  },

  // ROS 2 Topics
  rosTopics: [
    {
      topic: '/pcb/camera/image',
      type: 'sensor_msgs/msg/Image',
      rate: '10 FPS (640x480)',
      description: 'Transmits live raw camera frames captured by the Gazebo virtual camera sensor directly to the ROS 2 inspection node.'
    },
    {
      topic: '/pcb/inspection_trigger',
      type: 'std_msgs/msg/Bool',
      rate: 'Event-driven',
      description: 'Fired by the proximity sensor when a PCB reaches the inspection bay, pausing the conveyor and initiating AI inference.'
    },
    {
      topic: '/pcb/detections',
      type: 'custom_interfaces/msg/DetectionArray',
      rate: 'Post-inference',
      description: 'Publishes structured YOLOv8 detection metadata including defect classes, confidence scores, bounding box coordinates, and defect counts.'
    },
    {
      topic: '/pcb/detected_image',
      type: 'sensor_msgs/msg/Image',
      rate: 'Post-inference',
      description: 'Publishes OpenCV-annotated PCB frame rendered with bounding boxes, defect labels, and confidence tags for operator display.'
    },
    {
      topic: '/pcb/inspection_done',
      type: 'std_msgs/msg/Bool',
      rate: 'Event-driven',
      description: 'Signals completion of the inspection cycle, commanding the conveyor controller to release the inspected PCB and advance the next unit.'
    }
  ],

  // Quality Decisions
  qualityDecisions: [
    {
      decision: 'PASS',
      color: '#10b981',
      criteria: 'Zero defects detected across all 7 configured classes with confidence above rejection threshold.',
      workflow: 'Conveyor continues forward to automated packaging / next assembly phase.'
    },
    {
      decision: 'FAIL / REWORK',
      color: '#ef4444',
      criteria: 'One or more configured defects detected (e.g. Missing Hole, Short, Open, Copper).',
      workflow: 'PCB flagged in MongoDB, inspection record generated, routed to rework technician station.'
    },
    {
      decision: 'REVIEW',
      color: '#f59e0b',
      criteria: 'No hard failure detected, but borderline confidence or low illumination requires operator verification.',
      workflow: 'Captured frame escalated to operator terminal queue for manual optical verification.'
    }
  ],

  // Technology Stack categorized
  techStack: [
    {
      category: 'Artificial Intelligence & Deep Learning',
      items: [
        { name: 'Ultralytics YOLOv8', desc: 'Object detection architecture for real-time localized defect inference' },
        { name: 'Python 3.10+', desc: 'Core pipeline runtime and model inference environment' },
        { name: 'PyTorch', desc: 'Deep learning framework underpinning YOLOv8 training and tensor ops' },
        { name: 'best.pt', desc: 'Exported fine-tuned weights trained on labeled PCB defect dataset' }
      ]
    },
    {
      category: 'Computer Vision & Image Processing',
      items: [
        { name: 'OpenCV (cv2)', desc: 'Image preprocessing, color space conversion, and bounding box annotation' },
        { name: 'NumPy', desc: 'Fast multidimensional array operations for frame matrices and masks' },
        { name: 'CvBridge', desc: 'Bidirectional serialization bridge between ROS sensor_msgs and OpenCV images' }
      ]
    },
    {
      category: 'Industrial Robotics & Simulation',
      items: [
        { name: 'ROS 2 Jazzy', desc: 'Industrial communication bus, node orchestration, and message queues' },
        { name: 'Gazebo Sim 8', desc: 'High-fidelity physics simulation of factory floor and conveyor line' },
        { name: 'SDF 3D Models', desc: 'Simulation models for conveyor, inspection stand, camera mount, and PCBs' },
        { name: 'PCB Texture Mapping', desc: 'Original CV dataset defect photos mapped onto 3D PCB models' },
        { name: 'Proximity Sensor', desc: 'Optical sensor triggering sequential one-by-one inspection queue' }
      ]
    },
    {
      category: 'Backend & APIs',
      items: [
        { name: 'FastAPI', desc: 'Asynchronous Python web framework for low-latency inspection REST endpoints' },
        { name: 'REST & WebSockets', desc: 'Real-time telemetry and camera frame streaming to web clients' },
        { name: 'Uvicorn', desc: 'High-performance ASGI web server' }
      ]
    },
    {
      category: 'Database & Traceability',
      items: [
        { name: 'MongoDB', desc: 'Document database storing inspection logs, PCB serials, defect matrices, and batch stats' },
        { name: 'Inspection Records', desc: 'Full audit history per PCB ID, Machine ID, Camera ID, and timestamp' }
      ]
    },
    {
      category: 'Frontend & Mobile UI',
      items: [
        { name: 'React', desc: 'Component-based responsive frontend interface' },
        { name: 'Vite', desc: 'Ultra-fast frontend build tooling and HMR' },
        { name: 'Mobile Web Camera API', desc: 'HTML5 mediaDevices camera stream for shop-floor smartphone inspection' },
        { name: 'Responsive Industrial UI', desc: 'Dark high-contrast theme suited for industrial operator screens' }
      ]
    }
  ],

  // Advantages
  advantages: [
    { title: 'Automated Inspection', desc: 'Drastically reduces dependency on slow, fatigue-prone manual human visual inspection.' },
    { title: 'Rapid Inference', desc: 'AI analyzes PCB images in milliseconds with localized bounding boxes and defect classifications.' },
    { title: 'Consistent Quality', desc: 'Eliminates operator subjectivity; exact same detection thresholds applied across every shift.' },
    { title: 'Complete Traceability', desc: 'Every PCB ID, inspection ID, timestamp, camera ID, and defect coordinates stored in MongoDB.' },
    { title: 'Mobile Accessibility', desc: 'Operators can use standard mobile devices and tablet cameras without costly per-station PC rigs.' },
    { title: 'Centralized Telemetry', desc: 'Plant managers monitor defect trends, machine health, and batch yield through an industrial dashboard.' },
    { title: 'Virtual Factory Validation', desc: 'ROS 2 + Gazebo conveyor simulation validates automation logic before physical deployment.' },
    { title: 'Scalable Architecture', desc: 'Seamlessly add additional inspection machines and multiple cameras to the same backend.' }
  ],

  // Practical Challenges Solved
  challengesSolved: [
    {
      challenge: 'PCB Defect Dataset & Class Imbalance',
      solution: 'Structured labeled PCB defect dataset with balanced training, validation, and testing splits, annotating 7 distinct defect classes for YOLOv8 object detection.'
    },
    {
      challenge: 'Simulation Realism vs Pure 3D Models',
      solution: 'Instead of artificial uniform green plastic 3D models in Gazebo, original high-resolution defect images were mapped onto virtual PCB models as SDF materials, enabling the virtual camera to inspect real CV defects.'
    },
    {
      challenge: 'Conveyor Jam & Multi-PCB Race Conditions',
      solution: 'Implemented one-by-one sequential inspection logic: proximity sensor fires trigger, conveyor holds, camera captures frame, inference runs, decision publishes, and conveyor resumes only after /pcb/inspection_done.'
    },
    {
      challenge: 'ROS 2 to OpenCV Serialization Overhead',
      solution: 'Utilized CvBridge in a dedicated ROS 2 Python node to perform zero-copy conversions between sensor_msgs/Image and OpenCV BGR matrices.'
    },
    {
      challenge: 'Shop-Floor Accessibility Without Heavy Hardware',
      solution: 'Built a responsive React web client supporting HTML5 mobile camera capture, allowing operators to run AI inspection directly on mobile phones.'
    }
  ],

  // Future Improvements
  futureImprovements: [
    { area: 'Industrial PLC Integration', desc: 'Direct Modbus/TCP or OPC-UA fieldbus communication with physical Siemens/Beckhoff PLCs.' },
    { area: 'Pneumatic Reject Diverter', desc: 'Automated mechanical diverter arm on the conveyor to physically reject defective PCBs into quarantine bins.' },
    { area: 'Edge AI Deployment', desc: 'Containerized deployment to NVIDIA Jetson Orin / Industrial IPC for offline low-latency inference at line speed.' },
    { area: 'MES / ERP Connectivity', desc: 'Integration with manufacturing execution systems (MES) and SAP for automated inventory hold orders.' },
    { area: 'Predictive Quality Analytics', desc: 'Trend analysis identifying machine drift (e.g. solder bath temperature drops) before defect clusters form.' }
  ],

  // Folder Structure
  folderStructure: `PCB Inspection Project
├── frontend/
│   ├── React application
│   └── Mobile/desktop industrial UI
│
├── backend/
│   ├── FastAPI
│   ├── AI model inference
│   ├── API routes
│   ├── MongoDB database
│   └── Industrial telemetry APIs
│
├── pcb_robot_ws/
│   └── src/
│       ├── pcb_simulation/
│       │   ├── models/
│       │   │   ├── pcb_001/
│       │   │   ├── pcb_002/
│       │   │   ├── pcb_003/
│       │   │   ├── pcb_004/
│       │   │   ├── pcb_005/
│       │   │   ├── pcb_conveyor/
│       │   │   └── inspection_camera/
│       │   └── worlds/
│       │
│       └── pcb_inspection/
│           └── yolo_node.py
│
└── trained_model/
    └── best.pt`
};

