
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContactFormData } from '@/hooks/useContactForm';

interface City {
  id: string;
  name: string;
  state: string;
}

interface Neighborhood {
  id: string;
  name: string;
  city_id: string;
}

interface LocationFieldsProps {
  formData: ContactFormData;
  onUpdateFormData: (updates: Partial<ContactFormData>) => void;
  cities: City[];
  getFilteredNeighborhoods: (cityId: string) => Neighborhood[];
}

export const LocationFields = ({ 
  formData, 
  onUpdateFormData, 
  cities, 
  getFilteredNeighborhoods 
}: LocationFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="city">Cidade</Label>
        <Select 
          value={formData.city_id || "none"} 
          onValueChange={(value) => onUpdateFormData({ city_id: value === "none" ? "" : value, neighborhood: '' })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a cidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Selecione uma cidade</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city.id} value={city.id}>
                {city.name} - {city.state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="neighborhood">Bairro *</Label>
        {formData.city_id && formData.city_id !== "none" ? (
          <Select 
            value={formData.neighborhood || "none"} 
            onValueChange={(value) => onUpdateFormData({ neighborhood: value === "none" ? "" : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o bairro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Selecione um bairro</SelectItem>
              {getFilteredNeighborhoods(formData.city_id).map((neighborhood) => (
                <SelectItem key={neighborhood.id} value={neighborhood.name}>
                  {neighborhood.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id="neighborhood"
            value={formData.neighborhood}
            onChange={(e) => onUpdateFormData({ neighborhood: e.target.value })}
            placeholder="Digite o nome do bairro"
            required
          />
        )}
      </div>
    </>
  );
};
