# 文件位置: scripts/check_env.py
import sys
import pkg_resources
import os

def check_python_version():
    """檢查 Python 版本"""
    required_version = (3, 9)
    current_version = sys.version_info[:2]
    return current_version >= required_version

def check_dependencies():
    """檢查依賴項"""
    with open('../backend/requirements.txt') as f:
        required = [line.strip() for line in f if line.strip()]
    
    installed = {pkg.key: pkg.version for pkg in pkg_resources.working_set}
    missing = []
    
    for package in required:
        name = package.split('==')[0]
        if name.lower() not in installed:
            missing.append(name)
    
    return missing

def check_model_file():
    """檢查模型文件"""
    model_path = '../backend/models/Llama3-ChatQA-1.5-8B.gguf'
    return os.path.exists(model_path)

def main():
    """主檢查流程"""
    print("檢查環境配置...")
    
    # 檢查 Python 版本
    if not check_python_version():
        print("❌ Python 版本需要 3.9 或更高")
        return False
    print("✅ Python 版本檢查通過")
    
    # 檢查依賴
    missing = check_dependencies()
    if missing:
        print(f"❌ 缺少以下依賴: {', '.join(missing)}")
        return False
    print("✅ 依賴檢查通過")
    
    # 檢查模型文件
    if not check_model_file():
        print("❌ 模型文件不存在")
        return False
    print("✅ 模型文件檢查通過")
    
    print("🎉 所有檢查通過!")
    return True

if __name__ == "__main__":
    sys.exit(0 if main() else 1)