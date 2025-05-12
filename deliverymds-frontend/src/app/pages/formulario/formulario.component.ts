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

  searchInput: string = '';
  filteredSuggestions: any[] = [];
  fruits: any[] = [];
  vegetables: any[] = [];
  quantity: number = 0;
  priceText: string = '';
  selectedProduct: any = null;
  cartItems: any[] = [];
  totalPrice: number = 0;
  showForm: boolean = false;
  feedbackMessage: string = '';

  deliveryData = {
    name: '',
    phone: '',
    address: '',
    paymentMethod: ''
  };

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.loadProducts('FRUTA');
    this.loadProducts('LEGUME');
    this.loadCart();
  }

  loadProducts(tipo: string): void {
    this.produtoService.getProdutosPorTipo(tipo).subscribe(
      (produtos) => {
        console.log(`Produtos recebidos para ${tipo}:`, produtos);
        if (tipo === 'FRUTA') {
          this.fruits = produtos;
        } else {
          this.vegetables = produtos;
        }
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  filterSuggestions(): void {
    const searchTerm = this.searchInput.toLowerCase();
    this.filteredSuggestions = [...this.fruits, ...this.vegetables].filter(produto =>
      produto.nome.toLowerCase().includes(searchTerm)
    );
  }

  selectSuggestion(produto: any): void {
    this.selectedProduct = {
      name: produto.nome,
      price: produto.preco,
      unidade: produto.unidadePreco
    };
    this.searchInput = produto.nome;
    this.filteredSuggestions = [];
    this.updatePrice(); // sem argumento
  }

  updatePrice(event?: Event): void {
    const selectElement = event?.target as HTMLSelectElement | undefined;
    if (!selectElement) return;

    const selectedOption = selectElement.selectedOptions[0];
    if (!selectedOption) {
      this.priceText = '';
      this.selectedProduct = null;
      return;
    }

    const price = parseFloat(selectedOption.dataset['price'] || '0');
    const unidade = selectedOption.dataset['unidade'] || '';
    const quantity = this.quantity;

    if (quantity > 0) {
      const total = (price * quantity).toFixed(2);
      this.priceText = `Preço: R$ ${total} por ${unidade.toLowerCase()}`;
      this.selectedProduct = {
        name: selectedOption.value,
        price,
        unidade
      };
    }
  }

  addToCart(): void {
    if (this.selectedProduct && this.quantity > 0) {
      const itemTotal = this.selectedProduct.price * this.quantity;
      const item = {
        name: this.selectedProduct.name,
        quantity: this.quantity,
        price: itemTotal,
        unidade: this.selectedProduct.unidade
      };
      this.cartItems.push(item);
      this.totalPrice += itemTotal;
      this.saveCart();
      this.selectedProduct = null;
      this.quantity = 0;
      this.priceText = '';
    } else {
      alert('Por favor, selecione um produto e informe a quantidade.');
    }
  }

  removeFromCart(index: number): void {
    const item = this.cartItems[index];
    this.totalPrice -= item.price;
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  loadCart(): void {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = savedCart;
    this.totalPrice = savedCart.reduce((sum: number, item: any) => sum + item.price, 0);
  }

  showDeliveryForm(): void {
    this.showForm = true;
  }

  finalizePurchase(): void {
    console.log('Dados para envio:', this.deliveryData);
    alert('Compra finalizada!');
  }
}
