import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  searchInput = '';
  filteredSuggestions: any[] = [];
  fruits: any[] = [];
  vegetables: any[] = [];
  selectedFruitName = '';
  selectedVegetableName = '';
  quantity = 0;
  priceText = '';

  selectedProduct: any = null;
  cartItems: any[] = [];
  totalPrice = 0;

  showForm = false;
  deliveryData = { 
    name: '', 
    phone: '', 
    address: '', 
    paymentMethod: 'pix' 
  };

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.loadProducts('FRUTA');
    this.loadProducts('LEGUME');
    this.loadCart();
  }

  private loadProducts(tipo: string): void {
    this.produtoService.getProdutosPorTipo(tipo).subscribe({
      next: (produtos) => {
        if (tipo === 'FRUTA') {
          this.fruits = produtos;
          console.log('Frutas carregadas:', this.fruits);
        } else {
          this.vegetables = produtos;
          console.log('Legumes carregados:', this.vegetables);
        }
      },
      error: (err) => console.error('Erro ao carregar produtos:', err)
    });
  }

  onSearchInput(): void {
    this.selectedFruitName = '';
    this.selectedVegetableName = '';
    
    if (!this.searchInput) {
      this.filteredSuggestions = [];
      return;
    }
    
    const term = this.searchInput.toLowerCase();
    this.filteredSuggestions = [...this.fruits, ...this.vegetables]
      .filter(p => p.nome.toLowerCase().includes(term));
  }

  selectSuggestion(produto: any): void {
    this.clearAllFields();
    this.searchInput = produto.nome;
    this.selectedProduct = { 
      name: produto.nome, 
      price: produto.preco, 
      unidade: produto.unidadePreco 
    };
    this.updatePrice();
    this.filteredSuggestions = [];
  }

  onSelect(tipo: 'FRUTA' | 'LEGUME'): void {
    this.searchInput = '';
    this.filteredSuggestions = [];

    const selectedName = tipo === 'FRUTA' ? this.selectedFruitName : this.selectedVegetableName;
    const list = tipo === 'FRUTA' ? this.fruits : this.vegetables;
    
    if (tipo === 'FRUTA') {
      this.selectedVegetableName = '';
    } else {
      this.selectedFruitName = '';
    }

    const produto = list.find(p => p.nome === selectedName);
    if (produto) {
      this.selectedProduct = { 
        name: produto.nome, 
        price: produto.preco, 
        unidade: produto.unidadePreco 
      };
      this.updatePrice();
    } else {
      this.selectedProduct = null;
      this.priceText = '';
    }
  }

  updatePrice(): void {
    if (!this.selectedProduct || this.quantity <= 0) {
      this.priceText = '';
      return;
    }
    const total = (this.selectedProduct.price * this.quantity).toFixed(2);
    this.priceText = `Preço: R$ ${total}`;
  }

  addToCart(): void {
    if (!this.selectedProduct || this.quantity <= 0) {
      alert('Selecione um produto e informe uma quantidade válida.');
      return;
    }

    const itemTotal = this.selectedProduct.price * this.quantity;
    this.cartItems.push({
      name: this.selectedProduct.name,
      quantity: this.quantity,
      unidade: this.selectedProduct.unidade,
      price: itemTotal
    });
    
    this.totalPrice += itemTotal;
    this.saveCart();
    this.clearAllFields();
  }

  removeFromCart(index: number): void {
    const item = this.cartItems[index];
    this.totalPrice -= item.price;
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCart(): void {
    const saved = localStorage.getItem('cart');
    this.cartItems = saved ? JSON.parse(saved) : [];
    this.totalPrice = this.cartItems.reduce((sum, it) => sum + it.price, 0);
  }

  showDeliveryForm(): void {
    this.showForm = true;
  }

  finalizePurchase(): void {
    if (!this.deliveryData.name || !this.deliveryData.phone || !this.deliveryData.address) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }
    
    console.log('Compra finalizada:', {
      items: this.cartItems,
      total: this.totalPrice,
      delivery: this.deliveryData
    });
    
    alert(`Compra finalizada com sucesso!\nTotal: R$ ${this.totalPrice.toFixed(2)}`);
    this.clearAll();
  }

  private clearAll(): void {
    this.cartItems = [];
    this.totalPrice = 0;
    this.showForm = false;
    this.deliveryData = { name: '', phone: '', address: '', paymentMethod: 'pix' };
    localStorage.removeItem('cart');
  }

  private clearAllFields(): void {
    this.searchInput = '';
    this.selectedFruitName = '';
    this.selectedVegetableName = '';
    this.quantity = 0;
    this.priceText = '';
    this.selectedProduct = null;
  }
}