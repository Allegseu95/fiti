import { useState } from 'react';
import { Button, Label, Select, TextInput, Checkbox } from 'flowbite-react';

// store
import { useConfig } from '../store/useConfig';

// types

const chartTypes = ['bar', 'line', 'pie', 'area'];
const fields = ['fecha', 'ventas', 'producto', 'cliente', 'cantidad']; // ejemplo

export const Form = () => {
  const { config, setConfig } = useConfig();

  const [formData, setFormData] = useState({
    title: '',
    chartType: 'bar',
    xField: '',
    yField: '',
    groupField: '',
    color: '#6366f1',
    showLegend: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('dasdsa');
  };

  return (
    <form onSubmit={handleSubmit} className="border-2 border-purple-500 p-5">
      <div>
        <Label htmlFor="title" value="Título del gráfico" />
        <TextInput
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="type">Tipo de Grafico</Label>

        {/* <Select
          id="type"
          value={config?.type ?? ''}
          onChange={e => setConfig({ type: e.target.value })}
        >
          {ChartTypesList.map((type: any, index: number) => (
            <option key={index} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select> */}
      </div>

      <div>
        <Label htmlFor="xField" value="Campo eje X" />
        <Select name="xField" value={formData.xField} onChange={handleChange}>
          {fields.map(field => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="yField" value="Campo eje Y" />
        <Select name="yField" value={formData.yField} onChange={handleChange}>
          {fields.map(field => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="groupField" value="Campo de agrupación (opcional)" />
        <Select
          name="groupField"
          value={formData.groupField}
          onChange={handleChange}
        >
          <option value="">Ninguno</option>
          {fields.map(field => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="color" value="Color primario" />
        <TextInput
          name="color"
          type="color"
          value={formData.color}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center">
        <Checkbox
          name="showLegend"
          checked={formData.showLegend}
          onChange={handleChange}
        />
        <Label htmlFor="showLegend" className="ml-2">
          Mostrar leyenda
        </Label>
      </div>

      <Button type="submit">Generar gráfico</Button>
    </form>
  );
};
